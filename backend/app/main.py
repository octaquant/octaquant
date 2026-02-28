from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db import Base, engine
from app.routers.apikeys import router as apikey_router
from app.routers.auth import router as auth_router
from app.routers.bot import router as bot_router
from app.routers.market import router as market_router
from app.routers.risk import router as risk_router
from app.routers.subscription import router as subscription_router
from app.services import shared_worker

Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield
    await shared_worker.shutdown()


app = FastAPI(title=settings.app_name, version='2.0.0', lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

for router in (auth_router, subscription_router, apikey_router, market_router, bot_router, risk_router):
    app.include_router(router, prefix='/api/v1')


@app.get('/health')
def health_check():
    return {'status': 'ok', 'env': settings.app_env}
