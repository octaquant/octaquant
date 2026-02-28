from app.config import settings
from app.services.worker import UserBotWorker

shared_worker = UserBotWorker(poll_seconds=settings.worker_poll_seconds)
