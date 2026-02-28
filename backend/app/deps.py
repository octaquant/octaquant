from app.models import User


# Placeholder dependency until JWT auth wiring is attached.
def get_current_user() -> User:
    return User(id=1, email='demo@octaquant.com', password_hash='not-used')
