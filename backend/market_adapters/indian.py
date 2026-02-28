from random import uniform


def get_market_data(symbol: str) -> dict:
    return {
        'symbol': symbol,
        'price': round(25000 + uniform(-125, 125), 2),
        'vix': round(uniform(12, 22), 2),
        'pcr': round(uniform(0.75, 1.35), 2),
        'oi': int(uniform(1000000, 5000000)),
        'gamma': round(uniform(-0.45, 0.45), 3),
    }


def get_volatility(symbol: str) -> dict:
    market = get_market_data(symbol)
    return {'value': market['vix'], 'kind': 'vix'}


def get_tradeable_symbols() -> list[str]:
    return ['NIFTY', 'BANKNIFTY', 'FINNIFTY']


def calculate_market_metrics(symbol: str) -> dict:
    market = get_market_data(symbol)
    return {
        'oi_score': market['oi'] / 1_000_000,
        'risk_breadth': abs(market['gamma']) * 100,
        'sentiment_bias': (market['pcr'] - 1) * 100,
    }
