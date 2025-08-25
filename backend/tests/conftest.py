import os
import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")

from app.core.database import engine  # noqa: E402
from app.models.meeting import Base  # noqa: E402
from app import main as main_module  # noqa: E402


def _ensure_schema() -> None:
	# Import models to register them with Base before create_all
	from app.models import speaker as _  # noqa: F401
	from app.models import email_participant as _  # noqa: F401
	Base.metadata.create_all(bind=engine)


@pytest.fixture(scope="session")
def client() -> TestClient:
	_ensure_schema()
	return TestClient(main_module.app)


