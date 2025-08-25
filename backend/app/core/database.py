import os
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


DATABASE_URL = os.getenv("DATABASE_URL") or "sqlite:///./app.db"

# SQLite requires check_same_thread=False for multithreaded contexts
engine = create_engine(
	DATABASE_URL,
	connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator:
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()


