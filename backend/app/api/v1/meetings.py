from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.meeting import Meeting, Base
from app.schemas.meeting import MeetingCreate, MeetingOut, MeetingUpdate


router = APIRouter(prefix="/api/v1/meetings", tags=["meetings"])


@router.on_event("startup")
def create_tables() -> None:
	from app.core.database import engine
	Base.metadata.create_all(bind=engine)


@router.get("/", response_model=List[MeetingOut])
def list_meetings(db: Session = Depends(get_db)) -> List[Meeting]:
	return db.query(Meeting).order_by(Meeting.created_at.desc()).all()


@router.post("/", response_model=MeetingOut, status_code=status.HTTP_201_CREATED)
def create_meeting(payload: MeetingCreate, db: Session = Depends(get_db)) -> Meeting:
	meeting = Meeting(**payload.dict())
	db.add(meeting)
	db.commit()
	db.refresh(meeting)
	return meeting


@router.get("/{meeting_id}", response_model=MeetingOut)
def get_meeting(meeting_id: int, db: Session = Depends(get_db)) -> Meeting:
	meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
	if not meeting:
		raise HTTPException(status_code=404, detail="Meeting not found")
	return meeting


@router.patch("/{meeting_id}", response_model=MeetingOut)
def update_meeting(meeting_id: int, payload: MeetingUpdate, db: Session = Depends(get_db)) -> Meeting:
	meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
	if not meeting:
		raise HTTPException(status_code=404, detail="Meeting not found")
	for key, value in payload.dict(exclude_unset=True).items():
		setattr(meeting, key, value)
	db.commit()
	db.refresh(meeting)
	return meeting


@router.delete("/{meeting_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_meeting(meeting_id: int, db: Session = Depends(get_db)) -> None:
	meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
	if not meeting:
		raise HTTPException(status_code=404, detail="Meeting not found")
	db.delete(meeting)
	db.commit()
	return None


