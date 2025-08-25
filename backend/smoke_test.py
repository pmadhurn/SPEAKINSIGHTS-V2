import os
import sys
import json
from pathlib import Path

import requests


BASE = os.environ.get("API_BASE", "http://127.0.0.1:8000")


def main() -> int:
	# 1) Upload a file
	if len(sys.argv) < 2:
		print("Usage: python smoke_test.py <path-to-media-file>")
		return 2
	media_path = Path(sys.argv[1])
	if not media_path.exists():
		print(f"File not found: {media_path}")
		return 2

	with open(media_path, "rb") as f:
		files = {"file": (media_path.name, f)}
		r = requests.post(f"{BASE}/api/v1/upload/file", files=files)
		r.raise_for_status()
		data = r.json()
		meeting_id = data["meeting_id"]
		print("Uploaded, meeting:", meeting_id)

	# 2) Extract audio
	r = requests.post(f"{BASE}/api/v1/video/{meeting_id}/extract-audio")
	r.raise_for_status()
	print("Audio extracted")

	# 3) Transcribe
	r = requests.post(f"{BASE}/api/v1/video/{meeting_id}/transcribe")
	r.raise_for_status()
	print("Transcribed")

	# 4) Diarize placeholder
	r = requests.post(f"{BASE}/api/v1/speakers/{meeting_id}/diarize")
	r.raise_for_status()
	print("Diarization generated")

	# 5) Fetch meeting, speakers, segments
	meeting = requests.get(f"{BASE}/api/v1/meetings/{meeting_id}").json()
	speakers = requests.get(f"{BASE}/api/v1/speakers/{meeting_id}").json()
	segments = requests.get(f"{BASE}/api/v1/speakers/{meeting_id}/segments").json()
	print(json.dumps({"meeting": meeting, "speakers": speakers, "segments": segments}, indent=2))
	return 0


if __name__ == "__main__":
	sys.exit(main())


