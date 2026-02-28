from datetime import datetime
from typing import Any

from pydantic import BaseModel, EmailStr, Field

from .models import MarketType, SubscriptionPlan, TradeMode


MARKET_SYMBOLS = {
    MarketType.INDIAN: ['NIFTY', 'BANKNIFTY', 'FINNIFTY'],
    MarketType.CRYPTO: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'],
    MarketType.FOREX: ['XAUUSD', 'EURUSD', 'GBPUSD'],
}

PLAN_PERMISSIONS = {
    SubscriptionPlan.FREE: {'markets': {MarketType.INDIAN}, 'live_trading': False, 'max_active_bots': 1},
    SubscriptionPlan.PRO: {'markets': {MarketType.INDIAN, MarketType.CRYPTO}, 'live_trading': False, 'max_active_bots': 1},
    SubscriptionPlan.ELITE: {'markets': {MarketType.INDIAN, MarketType.CRYPTO, MarketType.FOREX}, 'live_trading': True, 'max_active_bots': 2},
}


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'


class AuthUserResponse(BaseModel):
    id: int
    email: EmailStr
    plan: SubscriptionPlan


class SubscriptionUpdateRequest(BaseModel):
    plan: SubscriptionPlan


class SubscriptionResponse(BaseModel):
    user_id: int
    plan: SubscriptionPlan
    permissions: dict[str, Any]


class ApiKeyUpsertRequest(BaseModel):
    market: MarketType
    api_key: str = Field(min_length=8)
    api_secret: str = Field(min_length=8)


class ApiKeyInfoResponse(BaseModel):
    market: MarketType
    is_active: bool
    updated_at: datetime


class ApiKeyTestResponse(BaseModel):
    market: MarketType
    connected: bool
    detail: str


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


class BotActionRequest(BaseModel):
    mode: TradeMode = TradeMode.PAPER


class BotActionResponse(BaseModel):
    status: str
    detail: str


class RiskRequest(BaseModel):
    equity: float = Field(gt=0)
    risk_pct: float = Field(gt=0, lt=1)
    stop_distance: float = Field(gt=0)
    win_rate: float = Field(gt=0, lt=1)
    reward_risk_ratio: float = Field(gt=0)


class RiskResponse(BaseModel):
    sizing: dict[str, Any]
    risk_of_ruin: float
