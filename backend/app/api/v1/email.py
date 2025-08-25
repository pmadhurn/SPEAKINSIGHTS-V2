from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.meeting import Meeting, Base
from app.models.email_participant import EmailParticipant
from app.schemas.email import EmailParticipantCreate, EmailParticipantOut


router = APIRouter(prefix="/api/v1/email", tags=["email"])


@router.on_event("startup")
def create_tables() -> None:
	from app.core.database import engine
	Base.metadata.create_all(bind=engine)


@router.get("/{meeting_id}", response_model=List[EmailParticipantOut])
def list_participants(meeting_id: int, db: Session = Depends(get_db)) -> List[EmailParticipant]:
	mtg = db.query(Meeting).filter(Meeting.id == meeting_id).first()
	if not mtg:
		raise HTTPException(status_code=404, detail="Meeting not found")
	return db.query(EmailParticipant).filter(EmailParticipant.meeting_id == meeting_id).all()


@router.post("/{meeting_id}", response_model=EmailParticipantOut)
def add_participant(meeting_id: int, payload: EmailParticipantCreate, db: Session = Depends(get_db)) -> EmailParticipant:
	mtg = db.query(Meeting).filter(Meeting.id == meeting_id).first()
	if not mtg:
		raise HTTPException(status_code=404, detail="Meeting not found")
	participant = EmailParticipant(meeting_id=meeting_id, email=payload.email, name=payload.name, role=payload.role)
	db.add(participant)
	db.commit()
	db.refresh(participant)
	return participant


