from typing import Optional, List
from pydantic import BaseModel


class SpeakerSegmentOut(BaseModel):
	id: int
	meeting_id: int
	speaker_id: int
	start_time: float
	end_time: float
	text: str
	confidence: Optional[float] = None
	word_count: Optional[int] = None

	class Config:
		from_attributes = True


class SpeakerOut(BaseModel):
	id: int
	meeting_id: int
	speaker_label: str
	speaker_name: Optional[str] = None
	speaker_role: Optional[str] = None
	total_speaking_time: Optional[int] = None
	word_count: Optional[int] = None
	segment_count: Optional[int] = None
	segments: Optional[List[SpeakerSegmentOut]] = None

	class Config:
		from_attributes = True


