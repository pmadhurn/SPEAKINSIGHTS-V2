from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.v1.meetings import router as meetings_router
from app.api.v1.upload import router as upload_router
from app.api.v1.video import router as video_router
from app.api.v1.speakers import router as speakers_router
from app.api.v1.email import router as email_router
from app.api.v1.webhook import router as webhook_router
from app.api.v1.analytics import router as analytics_router


def create_app() -> FastAPI:
	app = FastAPI(title="Speakinsights-V2.0 API", version="0.1.0")

	# CORS: allow local frontend during development
	app.add_middleware(
		CORSMiddleware,
		allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
		allow_credentials=True,
		allow_methods=["*"],
		allow_headers=["*"],
	)

	app.include_router(meetings_router)
	app.include_router(upload_router)
	app.include_router(video_router)
	app.include_router(speakers_router)
	app.include_router(email_router)
	app.include_router(webhook_router)
	app.include_router(analytics_router)

	# Serve uploaded files for playback
	app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

	@app.get("/health")
	async def health() -> dict:
		return {"status": "ok"}

	return app


app = create_app()


