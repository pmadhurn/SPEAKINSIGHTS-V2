import os
import uuid
from typing import Tuple

from fastapi import UploadFile


UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


async def save_upload_file(upload: UploadFile) -> Tuple[str, str]:
	"""Save uploaded file to disk, returning (path, original_filename)."""
	ext = os.path.splitext(upload.filename or "")[1]
	uid = uuid.uuid4().hex
	filename = f"{uid}{ext}"
	path = os.path.join(UPLOAD_DIR, filename)

	with open(path, "wb") as f:
		while True:
			chunk = await upload.read(1024 * 1024)
			if not chunk:
				break
			f.write(chunk)

	await upload.close()
	return path, upload.filename or filename


