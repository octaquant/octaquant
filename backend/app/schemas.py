from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field

from .models import MarketType, TradeMode


MARKET_SYMBOLS = {
    MarketType.INDIAN: ['NIFTY', 'BANKNIFTY', 'FINNIFTY'],
    MarketType.CRYPTO: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'],
    MarketType.FOREX: ['XAUUSD', 'EURUSD', 'GBPUSD'],
}


class MarketContextUpdate(BaseModel):
    selected_market: MarketType
    selected_symbol: str
    mode: TradeMode
    auto_volatility_filter: bool = True


class MarketContextResponse(BaseModel):
    user_id: int
    selected_market: MarketType
    selected_symbol: str
    auto_volatility_filter: bool
    mode: TradeMode
    updated_at: datetime
    market_intelligence: dict[str, Any] = Field(default_factory=dict)
    strategy_analytics: dict[str, Any] = Field(default_factory=dict)
    crowd_psychology: dict[str, Any] = Field(default_factory=dict)
    symbols: list[str]


class BotActionResponse(BaseModel):
    status: str
    detail: str
