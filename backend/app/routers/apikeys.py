from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.deps import get_current_user
from app.models import ApiCredential, MarketType, User
from app.schemas import ApiKeyInfoResponse, ApiKeyTestResponse, ApiKeyUpsertRequest
from app.security import decrypt_credential, encrypt_credential

router = APIRouter(prefix='/api-keys', tags=['api-keys'])


@router.post('/replace', response_model=ApiKeyInfoResponse)
def replace_api_key(payload: ApiKeyUpsertRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    existing = db.scalar(
        select(ApiCredential).where(
            ApiCredential.user_id == user.id,
            ApiCredential.market == payload.market,
            ApiCredential.is_active.is_(True),
        )
    )
    now = datetime.now(timezone.utc)
    if existing:
        existing.is_active = False
        existing.replaced_at = now

    credential = ApiCredential(
        user_id=user.id,
        market=payload.market,
        encrypted_key=encrypt_credential(payload.api_key),
        encrypted_secret=encrypt_credential(payload.api_secret),
        is_active=True,
    )
    db.add(credential)
    db.commit()
    return ApiKeyInfoResponse(market=credential.market, is_active=credential.is_active, updated_at=credential.created_at)


@router.get('/test/{market}', response_model=ApiKeyTestResponse)
def test_connection(market: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    try:
        market_enum = MarketType(market)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail='Unsupported market') from exc

    credential = db.scalar(
        select(ApiCredential).where(
            ApiCredential.user_id == user.id,
            ApiCredential.market == market_enum,
            ApiCredential.is_active.is_(True),
        )
    )
    if not credential:
        return ApiKeyTestResponse(market=market_enum, connected=False, detail='No active API key for market')

    key_preview = decrypt_credential(credential.encrypted_key)[:4]
    return ApiKeyTestResponse(market=credential.market, connected=True, detail=f'Credential decrypted successfully: {key_preview}***')
