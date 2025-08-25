from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.meeting import Meeting, Base
from app.utils.file_handler import save_upload_file


router = APIRouter(prefix="/api/v1/upload", tags=["upload"])


@router.on_event("startup")
def create_tables() -> None:
	from app.core.database import engine
	Base.metadata.create_all(bind=engine)


@router.post("/file")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)) -> dict:
	if not file.filename:
		raise HTTPException(status_code=400, detail="Missing filename")

	path, original = await save_upload_file(file)
	meeting = Meeting(title=original, description="Uploaded file", file_path=path, status="uploaded")
	db.add(meeting)
	db.commit()
	db.refresh(meeting)

	return {"meeting_id": meeting.id, "file_path": path, "original": original}


