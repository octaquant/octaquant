from app.models import BotState, MarketContext, TradeMode
from app.services.strategy_engine import StrategyEngine
from app.services.worker import UserBotWorker


class BotManager:
    def __init__(self, strategy_engine: StrategyEngine, worker: UserBotWorker):
        self.strategy_engine = strategy_engine
        self.worker = worker

    def safely_restart(self, bot_state: BotState, context: MarketContext) -> dict:
        stop_result = self.stop(bot_state)
        strategy_status = self.strategy_engine.reinitialize(
            market=context.selected_market.value,
            symbol=context.selected_symbol,
            mode=bot_state.mode.value,
        )
        start_result = self.start(bot_state)
        return {
            'stop': stop_result,
            'strategy': strategy_status,
            'start': start_result,
        }

    def stop(self, bot_state: BotState) -> dict:
        bot_state.enabled = False
        self.worker.stop(bot_state.user_id)
        return {'status': 'stopped'}

    def start(self, bot_state: BotState) -> dict:
        bot_state.enabled = True
        self.worker.ensure_running(bot_state.user_id)
        mode_note = 'paper trading' if bot_state.mode == TradeMode.PAPER else 'live mode placeholder'
        return {'status': 'running', 'mode': mode_note}
