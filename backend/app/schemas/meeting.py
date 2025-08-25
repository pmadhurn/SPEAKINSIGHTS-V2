from typing import Optional, Any
from pydantic import BaseModel, Field


class MeetingBase(BaseModel):
	title: str = Field(..., max_length=255)
	description: Optional[str] = None
	duration: Optional[int] = None
	file_path: Optional[str] = None
	video_path: Optional[str] = None
	audio_path: Optional[str] = None
	status: Optional[str] = "processing"
	transcript: Optional[str] = None
	summary: Optional[str] = None
	sentiment: Optional[str] = None
	language: Optional[str] = "en"
	processing_metadata: Optional[Any] = None


class MeetingCreate(MeetingBase):
	pass


class MeetingUpdate(BaseModel):
	title: Optional[str] = None
	description: Optional[str] = None
	status: Optional[str] = None
	summary: Optional[str] = None
	sentiment: Optional[str] = None
	language: Optional[str] = None
	processing_metadata: Optional[Any] = None


class MeetingOut(MeetingBase):
	id: int

	class Config:
		from_attributes = True


