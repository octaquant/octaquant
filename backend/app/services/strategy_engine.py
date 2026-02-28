from typing import Any


class StrategyEngine:
    """Market-agnostic strategy runtime. Inputs are normalized by adapters before use."""

    def reinitialize(self, *, market: str, symbol: str, mode: str) -> dict[str, str]:
        return {
            'status': 'ready',
            'market': market,
            'symbol': symbol,
            'mode': mode,
            'message': 'Strategy reinitialized with new runtime context.',
        }

    def evaluate(self, metrics: dict[str, Any], tradeable: bool) -> dict[str, Any]:
        if not tradeable:
            return {'action': 'HOLD', 'reason': 'volatility_filter'}
        signal_strength = sum(v for v in metrics.values() if isinstance(v, (float, int)))
        return {'action': 'BUY' if signal_strength > 0 else 'SELL', 'signal_strength': round(signal_strength, 2)}
