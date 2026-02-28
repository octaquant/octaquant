from fastapi import APIRouter, Depends

from app.deps import get_current_user
from app.models import MarketType, User
from app.schemas import RiskRequest, RiskResponse
from app.services.risk_engine import UniversalRiskEngine

router = APIRouter(prefix='/risk', tags=['risk'])
engine = UniversalRiskEngine()


@router.post('/evaluate', response_model=RiskResponse)
def evaluate_risk(payload: RiskRequest, user: User = Depends(get_current_user)):
    market = user.market_context.selected_market if user.market_context else MarketType.INDIAN
    sizing = engine.calculate_lot_size(
        equity=payload.equity,
        risk_pct=payload.risk_pct,
        stop_distance=payload.stop_distance,
        market=market,
    )
    risk_of_ruin = engine.calculate_risk_of_ruin(payload.win_rate, payload.reward_risk_ratio, payload.risk_pct)
    return RiskResponse(sizing=sizing, risk_of_ruin=risk_of_ruin)
