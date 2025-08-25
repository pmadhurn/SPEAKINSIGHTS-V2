from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, JSON
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func


Base = declarative_base()


class Meeting(Base):
	__tablename__ = "meetings"

	id = Column(Integer, primary_key=True, index=True)
	title = Column(String(255), nullable=False)
	description = Column(Text, nullable=True)
	created_at = Column(TIMESTAMP, server_default=func.now())
	updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
	duration = Column(Integer, nullable=True)
	file_path = Column(String(500), nullable=True)
	video_path = Column(String(500), nullable=True)
	audio_path = Column(String(500), nullable=True)
	status = Column(String(50), default="processing")
	transcript = Column(Text, nullable=True)
	summary = Column(Text, nullable=True)
	sentiment = Column(String(50), nullable=True)
	language = Column(String(10), default="en")
	processing_metadata = Column(JSON, nullable=True)


