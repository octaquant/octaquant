from fastapi import FastAPI

from app.db import Base, engine
from app.routers.market import router as market_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title='OctaQuant API', version='1.0.0')
app.include_router(market_router, prefix='/api/v1')


@app.get('/health')
def health_check():
    return {'status': 'ok'}
