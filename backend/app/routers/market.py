from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.deps import get_current_user
from app.models import User
from app.schemas import BotActionResponse, MarketContextResponse, MarketContextUpdate
from app.services.market_context_service import MarketContextService

router = APIRouter(prefix='/market', tags=['market'])
service = MarketContextService()


@router.get('/context', response_model=MarketContextResponse)
def read_market_context(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    context, bot_state = service.get_or_create_context(db, user.id)
    db.commit()
    return service.build_dashboard_payload(context, bot_state.mode)


@router.put('/context', response_model=MarketContextResponse)
def update_market_context(payload: MarketContextUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    try:
        result = service.update_context(
            db,
            user=user,
            market=payload.selected_market,
            symbol=payload.selected_symbol,
            mode=payload.mode,
            auto_filter=payload.auto_volatility_filter,
        )
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    return service.build_dashboard_payload(result['context'], result['bot_state'].mode)


@router.post('/bot/restart', response_model=BotActionResponse)
def restart_bot(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    context, bot_state = service.get_or_create_context(db, user.id)
    service.bot_manager.safely_restart(bot_state, context)
    db.commit()
    return BotActionResponse(status='ok', detail='Bot restarted safely with current market context.')
