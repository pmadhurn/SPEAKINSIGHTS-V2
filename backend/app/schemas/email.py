from typing import Optional, List
from pydantic import BaseModel, EmailStr


class EmailParticipantCreate(BaseModel):
	email: EmailStr
	name: Optional[str] = None
	role: Optional[str] = None


class EmailParticipantOut(BaseModel):
	id: int
	meeting_id: int
	email: str
	name: Optional[str]
	role: Optional[str]
	webhook_sent: bool

	class Config:
		from_attributes = True


