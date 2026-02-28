from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.deps import get_current_user
from app.models import TradeMode, User
from app.schemas import BotActionRequest, BotActionResponse, PLAN_PERMISSIONS
from app.services.market_context_service import MarketContextService

router = APIRouter(prefix='/bot', tags=['bot'])
service = MarketContextService()


@router.post('/start', response_model=BotActionResponse)
def start_bot(payload: BotActionRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    permissions = PLAN_PERMISSIONS[user.plan]
    if payload.mode == TradeMode.LIVE and not permissions['live_trading']:
        raise HTTPException(status_code=403, detail='Your plan does not allow live trading mode')

    context, bot_state = service.get_or_create_context(db, user.id)
    bot_state.mode = payload.mode
    result = service.bot_manager.start(bot_state)
    db.commit()
    return BotActionResponse(status='ok', detail=f"Bot started in {result['mode']}")


@router.post('/stop', response_model=BotActionResponse)
def stop_bot(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    _, bot_state = service.get_or_create_context(db, user.id)
    service.bot_manager.stop(bot_state)
    db.commit()
    return BotActionResponse(status='ok', detail='Bot stopped')
