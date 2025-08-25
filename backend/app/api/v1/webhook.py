import os
from typing import Any, Dict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests

from app.core.database import get_db
from app.models.meeting import Meeting, Base
from app.models.email_participant import EmailParticipant


router = APIRouter(prefix="/api/v1/webhook", tags=["webhook"])


@router.on_event("startup")
def create_tables() -> None:
	from app.core.database import engine
	Base.metadata.create_all(bind=engine)


@router.post("/test/{meeting_id}")
def send_test_webhook(meeting_id: int, db: Session = Depends(get_db)) -> Dict[str, Any]:
	url = os.getenv("N8N_WEBHOOK_URL")
	if not url:
		raise HTTPException(status_code=400, detail="N8N_WEBHOOK_URL not configured")
	mtg = db.query(Meeting).filter(Meeting.id == meeting_id).first()
	if not mtg:
		raise HTTPException(status_code=404, detail="Meeting not found")
	participants = db.query(EmailParticipant).filter(EmailParticipant.meeting_id == meeting_id).all()
	payload = {
		"meeting_id": mtg.id,
		"meeting_title": mtg.title,
		"duration": mtg.duration,
		"transcript": {"full_text": mtg.transcript or ""},
		"participants": [{"email": p.email, "name": p.name, "role": p.role} for p in participants],
	}
	r = requests.post(url, json=payload)
	return {"status": r.status_code, "response": (r.text[:500] if r.text else "")}


