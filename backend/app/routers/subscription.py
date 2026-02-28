from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.deps import get_current_user
from app.models import User
from app.schemas import PLAN_PERMISSIONS, SubscriptionResponse, SubscriptionUpdateRequest

router = APIRouter(prefix='/subscription', tags=['subscription'])


@router.get('', response_model=SubscriptionResponse)
def get_subscription(user: User = Depends(get_current_user)):
    return SubscriptionResponse(user_id=user.id, plan=user.plan, permissions=_serialize_permissions(user.plan))


@router.put('', response_model=SubscriptionResponse)
def update_subscription(payload: SubscriptionUpdateRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    user.plan = payload.plan
    db.add(user)
    db.commit()
    db.refresh(user)
    return SubscriptionResponse(user_id=user.id, plan=user.plan, permissions=_serialize_permissions(user.plan))


def _serialize_permissions(plan):
    perms = PLAN_PERMISSIONS[plan].copy()
    perms['markets'] = sorted(m.value for m in perms['markets'])
    return perms
