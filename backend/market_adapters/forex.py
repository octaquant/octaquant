from random import uniform


def get_market_data(symbol: str) -> dict:
    return {
        'symbol': symbol,
        'price': round(1.11 + uniform(-0.02, 0.02), 5),
        'atr': round(uniform(0.004, 0.02), 5),
        'atr_avg': round(uniform(0.006, 0.014), 5),
        'session_volatility': round(uniform(0.2, 1.2), 3),
        'macro_regime': 'risk_on' if uniform(0, 1) > 0.5 else 'risk_off',
    }


def get_volatility(symbol: str) -> dict:
    market = get_market_data(symbol)
    return {'value': market['atr'], 'atr_average': market['atr_avg'], 'kind': 'atr'}


def get_tradeable_symbols() -> list[str]:
    return ['XAUUSD', 'EURUSD', 'GBPUSD']


def calculate_market_metrics(symbol: str) -> dict:
    market = get_market_data(symbol)
    return {
        'session_heat': market['session_volatility'] * 100,
        'atr_ratio': market['atr'] / max(market['atr_avg'], 1e-6),
        'macro_state': market['macro_regime'],
    }
