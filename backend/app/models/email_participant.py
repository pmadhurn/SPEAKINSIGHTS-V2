from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, ForeignKey
from sqlalchemy.sql import func

from app.models.meeting import Base


class EmailParticipant(Base):
	__tablename__ = "email_participants"

	id = Column(Integer, primary_key=True, index=True)
	meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False)
	email = Column(String(255), nullable=False)
	name = Column(String(100), nullable=True)
	role = Column(String(100), nullable=True)
	webhook_sent = Column(Boolean, default=False)
	webhook_sent_at = Column(TIMESTAMP, nullable=True)
	created_at = Column(TIMESTAMP, server_default=func.now())


