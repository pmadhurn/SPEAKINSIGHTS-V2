from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.models.meeting import Meeting, Base
from app.models.speaker import Speaker, SpeakerSegment


router = APIRouter(prefix="/api/v1/analytics", tags=["analytics"])


@router.on_event("startup")
def create_tables() -> None:
	from app.core.database import engine
	Base.metadata.create_all(bind=engine)


@router.get("/meeting/{meeting_id}")
def meeting_stats(meeting_id: int, db: Session = Depends(get_db)) -> dict:
	meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
	if not meeting:
		raise HTTPException(status_code=404, detail="Meeting not found")
	segment_count = db.query(func.count(SpeakerSegment.id)).filter(SpeakerSegment.meeting_id == meeting_id).scalar() or 0
	speaker_count = db.query(func.count(Speaker.id)).filter(Speaker.meeting_id == meeting_id).scalar() or 0
	# Approx duration from segments if meeting.duration missing
	max_end = db.query(func.max(SpeakerSegment.end_time)).filter(SpeakerSegment.meeting_id == meeting_id).scalar()
	approx_duration = float(max_end) if max_end is not None else None
	return {
		"meeting_id": meeting_id,
		"title": meeting.title,
		"status": meeting.status,
		"speaker_count": speaker_count,
		"segment_count": segment_count,
		"duration_seconds": meeting.duration or approx_duration,
	}


