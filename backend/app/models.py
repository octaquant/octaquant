from datetime import datetime, timezone
from enum import Enum

from sqlalchemy import Boolean, DateTime, Enum as SqlEnum, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from .db import Base


class MarketType(str, Enum):
    INDIAN = 'indian'
    CRYPTO = 'crypto'
    FOREX = 'forex'


class TradeMode(str, Enum):
    PAPER = 'paper'
    LIVE = 'live'


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)


class MarketContext(Base):
    __tablename__ = 'market_context'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True)
    selected_market: Mapped[MarketType] = mapped_column(SqlEnum(MarketType), nullable=False, default=MarketType.INDIAN)
    selected_symbol: Mapped[str] = mapped_column(String(50), nullable=False, default='NIFTY')
    auto_volatility_filter: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )


class BotState(Base):
    __tablename__ = 'bot_state'

    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    mode: Mapped[TradeMode] = mapped_column(SqlEnum(TradeMode), nullable=False, default=TradeMode.PAPER)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )
