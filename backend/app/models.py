from datetime import datetime, timezone
from enum import Enum

from sqlalchemy import Boolean, DateTime, Enum as SqlEnum, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base


class SubscriptionPlan(str, Enum):
    FREE = 'free'
    PRO = 'pro'
    ELITE = 'elite'


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
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    plan: Mapped[SubscriptionPlan] = mapped_column(SqlEnum(SubscriptionPlan), nullable=False, default=SubscriptionPlan.FREE)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    market_context: Mapped['MarketContext'] = relationship(back_populates='user', uselist=False, cascade='all, delete-orphan')
    bot_state: Mapped['BotState'] = relationship(back_populates='user', uselist=False, cascade='all, delete-orphan')
    api_keys: Mapped[list['ApiCredential']] = relationship(back_populates='user', cascade='all, delete-orphan')


class ApiCredential(Base):
    __tablename__ = 'api_credentials'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    market: Mapped[MarketType] = mapped_column(SqlEnum(MarketType), nullable=False)
    encrypted_key: Mapped[str] = mapped_column(Text, nullable=False)
    encrypted_secret: Mapped[str] = mapped_column(Text, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    replaced_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    user: Mapped[User] = relationship(back_populates='api_keys')


class MarketContext(Base):
    __tablename__ = 'market_context'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True)
    selected_market: Mapped[MarketType] = mapped_column(SqlEnum(MarketType), nullable=False, default=MarketType.INDIAN)
    selected_symbol: Mapped[str] = mapped_column(String(50), nullable=False, default='NIFTY')
    auto_volatility_filter: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    user: Mapped[User] = relationship(back_populates='market_context')


class BotState(Base):
    __tablename__ = 'bot_state'

    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    mode: Mapped[TradeMode] = mapped_column(SqlEnum(TradeMode), nullable=False, default=TradeMode.PAPER)
    last_heartbeat: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    virtual_equity: Mapped[float] = mapped_column(Float, nullable=False, default=100_000)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    user: Mapped[User] = relationship(back_populates='bot_state')
