import os
from decimal import Decimal
from typing import List, Dict, Any


class WhisperXNotAvailable(Exception):
	pass


def diarize_with_whisperx(audio_path: str) -> Dict[str, Any]:
	"""Scaffold for WhisperX diarization.

	Return a dict with 'speakers' and 'segments' compatible with our models.
	Raises WhisperXNotAvailable if the environment isn't configured.
	"""
	# Scaffold: check env flag and URL/path to model resources
	if os.getenv("USE_WHISPERX", "false").lower() not in ("1", "true", "yes"):
		raise WhisperXNotAvailable("USE_WHISPERX not enabled")

	# In a real implementation you would call whisperx pipeline here.
	# For now, return a deterministic fake structure to validate plumbing.
	return {
		"speakers": [
			{"speaker_label": "SPEAKER_00"},
			{"speaker_label": "SPEAKER_01"},
		],
		"segments": [
			{"speaker_index": 0, "start": Decimal("0.000"), "end": Decimal("4.000"), "text": "Hello from X"},
			{"speaker_index": 1, "start": Decimal("4.000"), "end": Decimal("7.500"), "text": "Reply from Y"},
		],
	}


