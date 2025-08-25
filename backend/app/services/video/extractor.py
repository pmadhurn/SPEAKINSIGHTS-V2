import os
import subprocess
import uuid
from typing import Optional


UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


class AudioExtractionError(Exception):
	pass


def extract_audio(input_path: str, output_format: str = "wav") -> str:
	"""Extract audio track from a media file using ffmpeg and return the output path.

	Raises AudioExtractionError if ffmpeg fails or input missing.
	"""
	if not os.path.isfile(input_path):
		raise AudioExtractionError(f"Input file not found: {input_path}")

	output_name = f"{uuid.uuid4().hex}.{output_format}"
	output_path = os.path.join(UPLOAD_DIR, output_name)

	cmd = [
		"ffmpeg",
		"-y",
		"-i",
		input_path,
		"-vn",
		"-acodec",
		"pcm_s16le" if output_format == "wav" else "copy",
		"-ar",
		"16000" if output_format == "wav" else "44100",
		"-ac",
		"1" if output_format == "wav" else "2",
		output_path,
	]

	try:
		proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
		if proc.returncode != 0:
			raise AudioExtractionError(proc.stderr.decode(errors="ignore") or "ffmpeg failed")
		return output_path
	except FileNotFoundError as e:
		raise AudioExtractionError("ffmpeg not found on PATH") from e


