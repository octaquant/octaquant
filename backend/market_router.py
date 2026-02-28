from importlib import import_module

from app.models import MarketType


ADAPTER_MAP = {
    MarketType.INDIAN.value: 'backend.market_adapters.indian',
    MarketType.CRYPTO.value: 'backend.market_adapters.crypto',
    MarketType.FOREX.value: 'backend.market_adapters.forex',
}


def get_adapter(market: str):
    module_path = ADAPTER_MAP.get(market)
    if not module_path:
        raise ValueError(f'Unsupported market: {market}')
    return import_module(module_path)
