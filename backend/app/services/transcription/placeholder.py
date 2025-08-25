import time
from typing import Dict


def transcribe_placeholder(audio_path: str) -> Dict[str, str]:
	# Simulate processing
	time.sleep(0.2)
	return {
		"text": f"[Placeholder transcript for {audio_path}]",
		"language": "en",
	}


