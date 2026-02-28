from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

    app_name: str = 'OctaQuant API'
    app_env: str = 'production'
    database_url: str = 'postgresql+psycopg://postgres:postgres@localhost:5432/octaquant'

    jwt_secret: str = 'replace-me'
    jwt_algorithm: str = 'HS256'
    access_token_expire_minutes: int = 120

    fernet_key: str = '9Ryt9kfg7NA4xCVwvg8Q6jM6HzLxDGO2x9N6byN1Ns0='

    worker_poll_seconds: float = 5.0


settings = Settings()
