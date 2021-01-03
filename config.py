"""Flask configuration variables."""
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))


class Config:
    """Set Flask configuration from .env file."""

    # Security
    SECRET_KEY = environ.get("SECRET_KEY")
    SECURITY_PASSWORD_SALT = environ.get("SECURITY_PASSWORD_SALT")
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
    }

    # Database
    SQLALCHEMY_DATABASE_URI = f'postgresql://{environ.get("DB_USER")}:{environ.get("DB_PASSWORD")}@{environ.get("DB_HOST")}:{environ.get("DB_PORT")}/{environ.get("DB_NAME")}' if environ.get("FLASK_ENV") == 'prod' else f'postgresql://{environ.get("DB_DEV_USER")}:{environ.get("DB_DEV_PASSWORD")}@{environ.get("DB_DEV_HOST")}:{environ.get("DB_DEV_PORT")}/{environ.get("DB_DEV_NAME")}'
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

