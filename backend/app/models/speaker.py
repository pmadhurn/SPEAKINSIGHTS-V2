from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.models.meeting import Base


class Speaker(Base):
	__tablename__ = "speakers"

	id = Column(Integer, primary_key=True, index=True)
	meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False)
	speaker_label = Column(String(50), nullable=False)
	speaker_name = Column(String(100), nullable=True)
	speaker_role = Column(String(100), nullable=True)
	total_speaking_time = Column(Integer, nullable=True)
	word_count = Column(Integer, nullable=True)
	segment_count = Column(Integer, nullable=True)
	created_at = Column(TIMESTAMP, server_default=func.now())

	segments = relationship("SpeakerSegment", back_populates="speaker", cascade="all, delete-orphan")


class SpeakerSegment(Base):
	__tablename__ = "speaker_segments"

	id = Column(Integer, primary_key=True, index=True)
	meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False)
	speaker_id = Column(Integer, ForeignKey("speakers.id", ondelete="CASCADE"), nullable=False)
	start_time = Column(DECIMAL(10, 3), nullable=False)
	end_time = Column(DECIMAL(10, 3), nullable=False)
	text = Column(Text, nullable=False)
	confidence = Column(DECIMAL(5, 3), nullable=True)
	word_count = Column(Integer, nullable=True)
	created_at = Column(TIMESTAMP, server_default=func.now())

	speaker = relationship("Speaker", back_populates="segments")


