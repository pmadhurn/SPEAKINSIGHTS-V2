# Speakinsights-V2.0
ITS THE SUCCESSOR TO SPEAKINSIGHTS MORE SECURE AND MORE ROBUST

## Getting Started

### Frontend (Vite + React + TypeScript)
```
cd frontend
npm install
npm run dev
```

### Backend (FastAPI)
```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Docker (optional for later)
```
docker compose up --build
```

Frontend expects `VITE_API_URL` (defaults to http://localhost:8000).

## Using Postgres via Docker

`docker-compose.yml` provides a `postgres` service with credentials:
- DB: `speakinsights`
- User: `user`
- Password: `pass`

The backend reads `DATABASE_URL` and points to `postgres` container by default:
`postgresql://user:pass@postgres:5432/speakinsights`.

Schema is initialized from `init.sql` on first run.

## Processing Smoke Tests

1) Upload a file (creates meeting):
```
Invoke-RestMethod -Method Post -Uri 'http://127.0.0.1:8000/api/v1/upload/file' -InFile 'C:/path/to/file.mp4' -ContentType 'multipart/form-data'
```

2) Extract audio:
```
Invoke-RestMethod -Method Post -Uri 'http://127.0.0.1:8000/api/v1/video/{meeting_id}/extract-audio'
```

3) Transcribe (placeholder):
```
Invoke-RestMethod -Method Post -Uri 'http://127.0.0.1:8000/api/v1/video/{meeting_id}/transcribe'
```

### Real transcription (Faster-Whisper)

Set environment variable before starting backend:
```
$env:USE_FASTER_WHISPER="true"
$env:WHISPER_MODEL="small"  # options: tiny, base, small, medium, large-v2
$env:WHISPER_COMPUTE_TYPE="auto"  # or float16/int8 depending on hardware
```
Then start uvicorn.
