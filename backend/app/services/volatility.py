from app.models import MarketType


def is_tradeable(volatility: dict, market: MarketType) -> bool:
    if market == MarketType.INDIAN:
        return volatility.get('value', 0) > 14
    if market == MarketType.CRYPTO:
        return volatility.get('value', 0) > 2
    if market == MarketType.FOREX:
        atr = volatility.get('value', 0)
        atr_avg = volatility.get('atr_average', atr)
        return atr > atr_avg
    return False
