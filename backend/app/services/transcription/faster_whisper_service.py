import os
from typing import Dict

from faster_whisper import WhisperModel


_model_cache = None  # simple singleton cache in-process


def _get_model() -> WhisperModel:
	global _model_cache
	if _model_cache is not None:
		return _model_cache
	model_name = os.getenv("WHISPER_MODEL", "small")
	compute_type = os.getenv("WHISPER_COMPUTE_TYPE", "auto")
	# device selection: 'auto' lets ctranslate2 pick GPU if available
	_model_cache = WhisperModel(model_name, device="auto", compute_type=compute_type)
	return _model_cache


def transcribe_audio_with_faster_whisper(audio_path: str) -> Dict[str, str]:
	model = _get_model()
	segments, info = model.transcribe(audio_path, beam_size=5)
	text_parts = []
	for seg in segments:
		text_parts.append(seg.text)
	return {
		"text": " ".join(text_parts).strip(),
		"language": info.language or "en",
	}


