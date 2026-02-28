from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import BotState, MarketContext, MarketType, TradeMode
from app.schemas import MARKET_SYMBOLS
from app.services.bot_manager import BotManager
from app.services.risk_engine import UniversalRiskEngine
from app.services.strategy_engine import StrategyEngine
from app.services.volatility import is_tradeable
from backend.market_router import get_adapter


class MarketContextService:
    def __init__(self) -> None:
        self.strategy_engine = StrategyEngine()
        self.bot_manager = BotManager(self.strategy_engine)
        self.risk_engine = UniversalRiskEngine()

    def get_or_create_context(self, db: Session, user_id: int) -> tuple[MarketContext, BotState]:
        context = db.scalar(select(MarketContext).where(MarketContext.user_id == user_id))
        if not context:
            context = MarketContext(user_id=user_id)
            db.add(context)

        bot_state = db.get(BotState, user_id)
        if not bot_state:
            bot_state = BotState(user_id=user_id)
            db.add(bot_state)

        db.flush()
        return context, bot_state

    def update_context(self, db: Session, user_id: int, market: MarketType, symbol: str, mode: TradeMode, auto_filter: bool) -> dict:
        if symbol not in MARKET_SYMBOLS[market]:
            raise ValueError(f'Invalid symbol {symbol} for market {market.value}')

        context, bot_state = self.get_or_create_context(db, user_id)

        bot_state.mode = mode
        context.selected_market = market
        context.selected_symbol = symbol
        context.auto_volatility_filter = auto_filter

        restart_result = self.bot_manager.safely_restart(bot_state, context)
        db.commit()
        db.refresh(context)
        db.refresh(bot_state)

        return {
            'context': context,
            'bot_state': bot_state,
            'restart': restart_result,
        }

    def build_dashboard_payload(self, context: MarketContext, mode: TradeMode) -> dict:
        adapter = get_adapter(context.selected_market.value)
        market_data = adapter.get_market_data(context.selected_symbol)
        volatility = adapter.get_volatility(context.selected_symbol)
        metrics = adapter.calculate_market_metrics(context.selected_symbol)
        tradeable = is_tradeable(volatility, context.selected_market) if context.auto_volatility_filter else True

        strategy = self.strategy_engine.evaluate(metrics=metrics, tradeable=tradeable)
        risk = self.risk_engine.calculate_lot_size(
            equity=100_000,
            risk_pct=0.01,
            stop_distance=max(float(volatility.get('value', 1)), 0.0001),
            market=context.selected_market,
        )

        return {
            'user_id': context.user_id,
            'selected_market': context.selected_market,
            'selected_symbol': context.selected_symbol,
            'auto_volatility_filter': context.auto_volatility_filter,
            'mode': mode,
            'updated_at': context.updated_at,
            'market_intelligence': self._market_intelligence(context.selected_market, market_data),
            'strategy_analytics': {'metrics': metrics, 'signal': strategy, 'risk': risk},
            'crowd_psychology': self._crowd_psychology(context.selected_market, metrics),
            'symbols': adapter.get_tradeable_symbols(),
        }

    @staticmethod
    def _market_intelligence(market: MarketType, market_data: dict) -> dict:
        if market == MarketType.INDIAN:
            return {k: market_data[k] for k in ('oi', 'pcr', 'vix', 'gamma')}
        if market == MarketType.CRYPTO:
            return {k: market_data[k] for k in ('funding_rate', 'long_short_ratio', 'liquidation_cluster', 'range_24h')}
        return {k: market_data[k] for k in ('atr', 'session_volatility', 'macro_regime')}

    @staticmethod
    def _crowd_psychology(market: MarketType, metrics: dict) -> dict:
        return {
            'market': market.value,
            'heatmap': [
                {'zone': key, 'intensity': value if isinstance(value, (int, float)) else 0.5}
                for key, value in metrics.items()
            ],
        }
