from random import uniform


def get_market_data(symbol: str) -> dict:
    return {
        'symbol': symbol,
        'price': round(50000 + uniform(-2000, 2000), 2),
        'funding_rate': round(uniform(-0.02, 0.03), 4),
        'long_short_ratio': round(uniform(0.7, 1.8), 2),
        'range_24h': round(uniform(0.8, 6.5), 2),
        'liquidation_cluster': round(uniform(0.1, 0.95), 2),
    }


def get_volatility(symbol: str) -> dict:
    market = get_market_data(symbol)
    return {'value': market['range_24h'], 'kind': 'range_24h'}


def get_tradeable_symbols() -> list[str]:
    return ['BTCUSDT', 'ETHUSDT', 'SOLUSDT']


def calculate_market_metrics(symbol: str) -> dict:
    market = get_market_data(symbol)
    return {
        'liquidity_stress': market['liquidation_cluster'] * 100,
        'funding_pressure': market['funding_rate'] * 100,
        'positioning_imbalance': (market['long_short_ratio'] - 1) * 100,
    }
