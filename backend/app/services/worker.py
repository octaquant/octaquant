import asyncio
from datetime import datetime, timezone

from sqlalchemy import select

from app.db import SessionLocal
from app.models import BotState, TradeMode


class UserBotWorker:
    def __init__(self, poll_seconds: float = 5.0):
        self.poll_seconds = poll_seconds
        self._tasks: dict[int, asyncio.Task] = {}

    def ensure_running(self, user_id: int):
        if user_id in self._tasks and not self._tasks[user_id].done():
            return
        self._tasks[user_id] = asyncio.create_task(self._run(user_id), name=f'bot-worker-{user_id}')

    def stop(self, user_id: int):
        task = self._tasks.pop(user_id, None)
        if task and not task.done():
            task.cancel()

    async def shutdown(self):
        for user_id in list(self._tasks):
            self.stop(user_id)
        await asyncio.sleep(0)

    async def _run(self, user_id: int):
        while True:
            with SessionLocal() as db:
                bot_state = db.scalar(select(BotState).where(BotState.user_id == user_id))
                if not bot_state or not bot_state.enabled:
                    return

                if bot_state.mode == TradeMode.PAPER:
                    bot_state.virtual_equity *= 1.0001
                bot_state.last_heartbeat = datetime.now(timezone.utc)
                db.commit()
            await asyncio.sleep(self.poll_seconds)
