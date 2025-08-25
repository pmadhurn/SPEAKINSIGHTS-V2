from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.meeting import Meeting, Base
from app.services.video.extractor import extract_audio, AudioExtractionError
from app.services.transcription.placeholder import transcribe_placeholder
import os
from app.services.transcription.faster_whisper_service import transcribe_audio_with_faster_whisper


router = APIRouter(prefix="/api/v1/video", tags=["video"])


@router.on_event("startup")
def create_tables() -> None:
	from app.core.database import engine
	Base.metadata.create_all(bind=engine)


@router.post("/{meeting_id}/extract-audio")
def api_extract_audio(meeting_id: int, db: Session = Depends(get_db)) -> dict:
	mtg = db.query(Meeting).filter(Meeting.id == meeting_id).first()
	if not mtg:
		raise HTTPException(status_code=404, detail="Meeting not found")
	if not mtg.file_path:
		raise HTTPException(status_code=400, detail="No source file to extract from")
	try:
		audio_path = extract_audio(mtg.file_path)
		mtg.audio_path = audio_path
		mtg.status = "audio_extracted"
		db.commit()
		db.refresh(mtg)
		return {"audio_path": audio_path, "meeting_id": mtg.id}
	except AudioExtractionError as e:
		raise HTTPException(status_code=500, detail=str(e))


@router.post("/{meeting_id}/transcribe")
def api_transcribe(meeting_id: int, db: Session = Depends(get_db)) -> dict:
	mtg = db.query(Meeting).filter(Meeting.id == meeting_id).first()
	if not mtg:
		raise HTTPException(status_code=404, detail="Meeting not found")
	if not mtg.audio_path:
		raise HTTPException(status_code=400, detail="No audio to transcribe")
	use_real = os.getenv("USE_FASTER_WHISPER", "false").lower() in ("1", "true", "yes")
	if use_real:
		result = transcribe_audio_with_faster_whisper(mtg.audio_path)
	else:
		result = transcribe_placeholder(mtg.audio_path)
	mtg.transcript = result["text"]
	mtg.language = result.get("language", mtg.language)
	mtg.status = "transcribed"
	db.commit()
	db.refresh(mtg)
	return {"meeting_id": mtg.id, "status": mtg.status}


