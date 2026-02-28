from app.models import BotState, MarketContext
from app.services.strategy_engine import StrategyEngine


class BotManager:
    def __init__(self, strategy_engine: StrategyEngine):
        self.strategy_engine = strategy_engine

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

    @staticmethod
    def stop(bot_state: BotState) -> dict:
        bot_state.enabled = False
        return {'status': 'stopped'}

    @staticmethod
    def start(bot_state: BotState) -> dict:
        bot_state.enabled = True
        return {'status': 'running'}
