# SpeakInsights V2 - Complete Development Prompt

## Project Overview
Build a modern, comprehensive meeting transcription and analysis platform using React/TypeScript frontend with FastAPI backend. This is a complete rewrite of the existing SpeakInsights project, incorporating advanced features for video synchronization, speaker diarization, and automated workflow integration.

## Core Requirements

### Technology Stack
- **Frontend**: React 18+ with TypeScript, Vite for build tooling
- **Backend**: FastAPI with Python 3.11+
- **Database**: PostgreSQL (primary) with SQLite fallback
- **Containerization**: Docker & Docker Compose
- **AI/ML**: OpenAI Whisper, WhisperX, Ollama integration
- **Video Processing**: FFmpeg for audio/video handling
- **Webhook Integration**: n8n webhook support
- **MCP Integration**: Model Context Protocol support

### Key Features to Implement

#### 1. Video-Synchronized Transcription System
- **Video Panel Integration**: Display video feed alongside transcript
- **Timestamp Synchronization**: Click on transcript to jump to specific video moment
- **Video Controls**: Play/pause, seek, speed control integrated with transcript
- **Multi-format Support**: MP4, AVI, MOV, WebM video formats
- **Audio Extraction**: Automatic audio extraction from video for transcription
- **Video Timeline**: Visual timeline showing speaker segments and key moments

#### 2. Advanced Speaker Diarization
- **Multi-Speaker Detection**: Identify and label different speakers
- **Speaker Timeline**: Visual representation of who spoke when
- **Speaker Statistics**: Speaking time, word count per speaker
- **Speaker Profiles**: Assign names/roles to detected speakers
- **Color-coded Transcripts**: Different colors for different speakers
- **Speaker Search**: Find all segments by specific speaker

#### 3. Email Integration & Workflow
- **Post-Meeting Email Input**: Form to collect participant email addresses
- **Email Validation**: Validate email format and domains
- **Webhook Payload**: Include emails in n8n webhook data
- **Email Templates**: Customizable email templates for different meeting types
- **Batch Email Processing**: Handle multiple recipients efficiently
- **Email Status Tracking**: Track delivery status and responses

#### 4. n8n Webhook Integration
- **Comprehensive Webhook Payload**: Include all meeting data, emails, action items
- **Webhook Configuration**: Easy setup and testing interface
- **Retry Logic**: Automatic retry on webhook failures
- **Webhook Templates**: Pre-configured templates for common workflows
- **Real-time Status**: Live webhook delivery status
- **Webhook History**: Log of all webhook calls and responses

#### 5. Ollama AI Integration
- **Local LLM Support**: Full Ollama integration for summaries and analysis
- **Model Management**: Download, switch, and manage different models
- **Custom Prompts**: Configurable prompts for different analysis types
- **Streaming Responses**: Real-time AI response streaming
- **Model Performance**: Track model performance and response times
- **Fallback Mechanisms**: Graceful fallback to cloud models if needed

## Detailed Technical Specifications

### Frontend Architecture (React/TypeScript)

#### Component Structure
```
src/
├── components/
│   ├── video/
│   │   ├── VideoPlayer.tsx          # Main video player component
│   │   ├── VideoControls.tsx        # Custom video controls
│   │   ├── VideoTimeline.tsx        # Speaker timeline overlay
│   │   └── VideoSyncManager.tsx     # Sync video with transcript
│   ├── transcript/
│   │   ├── TranscriptViewer.tsx     # Main transcript display
│   │   ├── SpeakerSegment.tsx       # Individual speaker segments
│   │   ├── TranscriptSearch.tsx     # Search within transcript
│   │   └── TranscriptExport.tsx     # Export functionality
│   ├── speakers/
│   │   ├── SpeakerPanel.tsx         # Speaker management panel
│   │   ├── SpeakerStats.tsx         # Speaking statistics
│   │   ├── SpeakerProfile.tsx       # Speaker profile editor
│   │   └── SpeakerTimeline.tsx      # Visual speaker timeline
│   ├── email/
│   │   ├── EmailCollector.tsx       # Post-meeting email form
│   │   ├── EmailValidator.tsx       # Email validation component
│   │   ├── EmailPreview.tsx         # Preview email content
│   │   └── EmailStatus.tsx          # Delivery status tracker
│   ├── webhook/
│   │   ├── WebhookConfig.tsx        # Webhook configuration
│   │   ├── WebhookTester.tsx        # Test webhook connectivity
│   │   ├── WebhookHistory.tsx       # Webhook call history
│   │   └── WebhookTemplates.tsx     # Pre-built templates
│   ├── ai/
│   │   ├── OllamaManager.tsx        # Ollama model management
│   │   ├── AIAnalysis.tsx           # AI-powered analysis
│   │   ├── PromptEditor.tsx         # Custom prompt editor
│   │   └── ModelSelector.tsx        # Model selection interface
│   └── common/
│       ├── FileUploader.tsx         # Drag-drop file upload
│       ├── ProgressBar.tsx          # Processing progress
│       ├── ErrorBoundary.tsx        # Error handling
│       └── LoadingSpinner.tsx       # Loading states
├── pages/
│   ├── Dashboard.tsx                # Main dashboard
│   ├── MeetingView.tsx             # Individual meeting view
│   ├── Upload.tsx                  # File upload page
│   ├── Settings.tsx                # Configuration settings
│   └── Analytics.tsx               # Meeting analytics
├── hooks/
│   ├── useVideoSync.ts             # Video-transcript sync
│   ├── useWebSocket.ts             # Real-time updates
│   ├── useWebhook.ts               # Webhook management
│   └── useOllama.ts                # Ollama integration
├── services/
│   ├── api.ts                      # API client
│   ├── videoService.ts             # Video processing
│   ├── webhookService.ts           # Webhook handling
│   └── ollamaService.ts            # Ollama communication
└── types/
    ├── meeting.ts                  # Meeting data types
    ├── speaker.ts                  # Speaker data types
    ├── webhook.ts                  # Webhook types
    └── video.ts                    # Video-related types
```

#### Key Frontend Features
- **Responsive Design**: Mobile-first, works on all devices
- **Real-time Updates**: WebSocket integration for live processing updates
- **Drag & Drop**: Intuitive file upload with progress tracking
- **Keyboard Shortcuts**: Power user shortcuts for common actions
- **Dark/Light Mode**: Theme switching with system preference detection
- **Accessibility**: Full WCAG 2.1 AA compliance
- **PWA Support**: Progressive Web App capabilities for offline use

### Backend Architecture (FastAPI)

#### API Structure
```
app/
├── api/
│   ├── v1/
│   │   ├── endpoints/
│   │   │   ├── meetings.py          # Meeting CRUD operations
│   │   │   ├── upload.py            # File upload handling
│   │   │   ├── transcription.py     # Transcription endpoints
│   │   │   ├── speakers.py          # Speaker management
│   │   │   ├── video.py             # Video processing
│   │   │   ├── webhook.py           # Webhook management
│   │   │   ├── email.py             # Email handling
│   │   │   └── ollama.py            # Ollama integration
│   │   └── api.py                   # API router
├── core/
│   ├── config.py                    # Configuration management
│   ├── database.py                  # Database connection
│   ├── security.py                  # Authentication & authorization
│   └── websocket.py                 # WebSocket manager
├── services/
│   ├── transcription/
│   │   ├── whisper_service.py       # Standard Whisper
│   │   ├── whisperx_service.py      # WhisperX integration
│   │   └── diarization_service.py   # Speaker diarization
│   ├── video/
│   │   ├── processor.py             # Video processing
│   │   ├── extractor.py             # Audio extraction
│   │   └── synchronizer.py          # Video-transcript sync
│   ├── ai/
│   │   ├── ollama_client.py         # Ollama communication
│   │   ├── prompt_manager.py        # Prompt templates
│   │   └── model_manager.py         # Model lifecycle
│   ├── webhook/
│   │   ├── n8n_client.py            # n8n webhook client
│   │   ├── payload_builder.py       # Webhook payload construction
│   │   └── retry_manager.py         # Retry logic
│   └── email/
│       ├── validator.py             # Email validation
│       ├── template_engine.py       # Email templates
│       └── sender.py                # Email sending
├── models/
│   ├── meeting.py                   # Meeting data models
│   ├── speaker.py                   # Speaker models
│   ├── video.py                     # Video models
│   ├── webhook.py                   # Webhook models
│   └── user.py                      # User models
└── utils/
    ├── file_handler.py              # File operations
    ├── video_utils.py               # Video utilities
    ├── audio_utils.py               # Audio utilities
    └── validation.py                # Data validation
```

### Database Schema

#### Core Tables
```sql
-- Meetings table
CREATE TABLE meetings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration INTEGER, -- in seconds
    file_path VARCHAR(500),
    video_path VARCHAR(500),
    audio_path VARCHAR(500),
    status VARCHAR(50) DEFAULT 'processing',
    transcript TEXT,
    summary TEXT,
    sentiment VARCHAR(50),
    language VARCHAR(10) DEFAULT 'en',
    processing_metadata JSONB
);

-- Speakers table
CREATE TABLE speakers (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    speaker_label VARCHAR(50) NOT NULL,
    speaker_name VARCHAR(100),
    speaker_role VARCHAR(100),
    total_speaking_time INTEGER, -- in seconds
    word_count INTEGER,
    segment_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Speaker segments table
CREATE TABLE speaker_segments (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    speaker_id INTEGER REFERENCES speakers(id) ON DELETE CASCADE,
    start_time DECIMAL(10,3) NOT NULL,
    end_time DECIMAL(10,3) NOT NULL,
    text TEXT NOT NULL,
    confidence DECIMAL(5,3),
    word_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Action items table
CREATE TABLE action_items (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    assigned_to VARCHAR(100),
    due_date DATE,
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email participants table
CREATE TABLE email_participants (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    role VARCHAR(100),
    webhook_sent BOOLEAN DEFAULT FALSE,
    webhook_sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Webhook logs table
CREATE TABLE webhook_logs (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    webhook_url VARCHAR(500),
    payload JSONB,
    response_status INTEGER,
    response_body TEXT,
    attempt_number INTEGER DEFAULT 1,
    success BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Video synchronization table
CREATE TABLE video_sync (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    video_duration DECIMAL(10,3),
    audio_offset DECIMAL(10,3) DEFAULT 0,
    sync_points JSONB, -- Array of sync points
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Video Integration Specifications

#### Video Player Features
- **Synchronized Playback**: Video plays in sync with transcript highlighting
- **Click-to-Seek**: Click any transcript segment to jump to that video moment
- **Speaker Highlighting**: Visual indicators showing current speaker
- **Playback Controls**: Custom controls integrated with transcript
- **Speed Control**: Variable playback speed (0.5x to 2x)
- **Fullscreen Mode**: Expandable video player
- **Picture-in-Picture**: Continue watching while browsing transcript

#### Video Processing Pipeline
1. **Upload Handling**: Accept video files up to 2GB
2. **Audio Extraction**: Extract high-quality audio for transcription
3. **Video Optimization**: Compress video for web playback
4. **Thumbnail Generation**: Create video thumbnails at key moments
5. **Sync Point Detection**: Identify audio-video sync points
6. **Metadata Extraction**: Duration, resolution, codec information

### Email & Webhook Integration

#### Email Collection Workflow
1. **Post-Processing Form**: Show email collection form after transcription
2. **Participant Management**: Add/remove participants with roles
3. **Email Validation**: Real-time validation with domain checking
4. **Template Selection**: Choose from pre-built email templates
5. **Preview & Send**: Preview email content before webhook trigger

#### n8n Webhook Payload Structure
```json
{
  "meeting_id": "12345",
  "meeting_title": "Weekly Team Standup",
  "timestamp": "2025-01-15T10:30:00Z",
  "duration": 1800,
  "participants": [
    {
      "email": "john@company.com",
      "name": "John Doe",
      "role": "Team Lead",
      "speaking_time": 420
    }
  ],
  "transcript": {
    "full_text": "Meeting transcript...",
    "formatted_with_speakers": "Speaker segments...",
    "word_count": 2500
  },
  "summary": {
    "executive_summary": "Key meeting points...",
    "key_decisions": ["Decision 1", "Decision 2"],
    "next_steps": ["Step 1", "Step 2"]
  },
  "action_items": [
    {
      "text": "Complete project proposal",
      "assigned_to": "john@company.com",
      "priority": "high",
      "due_date": "2025-01-20"
    }
  ],
  "speakers": [
    {
      "label": "SPEAKER_00",
      "name": "John Doe",
      "speaking_time": 420,
      "word_count": 650,
      "segments": 15
    }
  ],
  "video_info": {
    "has_video": true,
    "duration": 1800,
    "video_url": "https://app.com/video/12345",
    "thumbnail_url": "https://app.com/thumb/12345.jpg"
  },
  "metadata": {
    "processing_time": 45,
    "transcription_method": "whisperx",
    "ai_model": "dolphin-mistral:7b",
    "language": "en",
    "confidence_score": 0.92
  }
}
```

### Ollama Integration Specifications

#### Model Management
- **Model Discovery**: Auto-detect available Ollama models
- **Model Download**: Download new models through UI
- **Model Switching**: Easy switching between models for different tasks
- **Performance Monitoring**: Track model response times and quality
- **Custom Prompts**: User-defined prompts for specific analysis types

#### AI Analysis Features
- **Smart Summarization**: Context-aware meeting summaries
- **Action Item Extraction**: Intelligent task identification
- **Sentiment Analysis**: Meeting mood and participant engagement
- **Topic Modeling**: Identify main discussion topics
- **Decision Tracking**: Extract decisions and commitments
- **Follow-up Suggestions**: AI-generated next steps

### Docker Configuration

#### Multi-Container Setup
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
      - REACT_APP_WS_URL=ws://localhost:8000/ws
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/speakinsights
      - OLLAMA_URL=http://ollama:11434
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./backend:/app
      - ./uploads:/app/uploads
      - ./models:/app/models
    depends_on:
      - postgres
      - redis
      - ollama

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=speakinsights
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    environment:
      - OLLAMA_ORIGINS=*
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
  ollama_data:
```

### MCP (Model Context Protocol) Integration

#### MCP Server Configuration
```json
{
  "mcpServers": {
    "speakinsights-mcp": {
      "command": "python",
      "args": ["-m", "app.mcp.server"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost:5432/speakinsights",
        "OLLAMA_URL": "http://localhost:11434"
      },
      "disabled": false,
      "autoApprove": [
        "get_meetings",
        "get_meeting_transcript",
        "get_action_items",
        "search_meetings"
      ]
    }
  }
}
```

#### MCP Tools to Implement
- **get_meetings**: Retrieve meeting list with filters
- **get_meeting_transcript**: Get full transcript with speaker info
- **get_action_items**: Extract action items from meetings
- **search_meetings**: Search across all meeting content
- **get_speaker_stats**: Speaker analysis and statistics
- **export_meeting_data**: Export meeting data in various formats

### Development Phases

#### Phase 1: Core Infrastructure (Week 1-2)
- Set up React/TypeScript frontend with Vite
- Implement FastAPI backend with PostgreSQL
- Create Docker containerization
- Basic file upload and processing pipeline
- Database schema implementation

#### Phase 2: Video Integration (Week 3-4)
- Video player component with custom controls
- Audio extraction from video files
- Video-transcript synchronization
- Timeline visualization
- Video processing pipeline

#### Phase 3: Advanced Transcription (Week 5-6)
- WhisperX integration for enhanced transcription
- Speaker diarization implementation
- Speaker management interface
- Real-time processing updates via WebSocket

#### Phase 4: AI & Analysis (Week 7-8)
- Ollama integration and model management
- Advanced AI analysis features
- Custom prompt system
- Performance monitoring and optimization

#### Phase 5: Email & Webhook Integration (Week 9-10)
- Email collection and validation system
- n8n webhook integration
- Webhook payload construction
- Email template system
- Delivery tracking and retry logic

#### Phase 6: MCP & Final Features (Week 11-12)
- MCP server implementation
- Advanced search and filtering
- Analytics dashboard
- Performance optimization
- Security hardening
- Documentation and testing

### Security & Performance Requirements

#### Security Features
- **Authentication**: JWT-based authentication system
- **Authorization**: Role-based access control
- **File Validation**: Strict file type and size validation
- **Input Sanitization**: Prevent XSS and injection attacks
- **Rate Limiting**: API rate limiting and abuse prevention
- **Data Encryption**: Encrypt sensitive data at rest
- **Secure Headers**: Implement security headers and CORS

#### Performance Optimizations
- **Lazy Loading**: Load components and data on demand
- **Caching**: Redis caching for frequently accessed data
- **CDN Integration**: Serve static assets via CDN
- **Database Indexing**: Optimize database queries with proper indexes
- **Background Processing**: Use Celery for long-running tasks
- **Video Streaming**: Implement adaptive bitrate streaming
- **Compression**: Gzip compression for API responses

### Testing Strategy

#### Frontend Testing
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Cypress for E2E testing
- **Component Tests**: Storybook for component documentation
- **Performance Tests**: Lighthouse CI for performance monitoring

#### Backend Testing
- **Unit Tests**: pytest for API endpoints
- **Integration Tests**: Test database operations
- **Load Tests**: Locust for performance testing
- **Security Tests**: OWASP ZAP for security scanning

### Deployment & DevOps

#### CI/CD Pipeline
- **GitHub Actions**: Automated testing and deployment
- **Docker Registry**: Container image management
- **Environment Management**: Separate dev/staging/prod environments
- **Database Migrations**: Automated schema migrations
- **Health Checks**: Comprehensive health monitoring
- **Logging**: Centralized logging with ELK stack
- **Monitoring**: Prometheus + Grafana for metrics

### Documentation Requirements

#### User Documentation
- **User Guide**: Complete user manual with screenshots
- **API Documentation**: OpenAPI/Swagger documentation
- **Video Tutorials**: Screen recordings for key features
- **FAQ**: Common questions and troubleshooting

#### Developer Documentation
- **Setup Guide**: Local development environment setup
- **Architecture Overview**: System design and component interaction
- **API Reference**: Detailed API endpoint documentation
- **Database Schema**: Complete database documentation
- **Deployment Guide**: Production deployment instructions

## Success Criteria

### Functional Requirements
- ✅ Upload and process video files with audio extraction
- ✅ Real-time video-transcript synchronization
- ✅ Multi-speaker diarization with speaker management
- ✅ Email collection and webhook integration
- ✅ Ollama AI integration with model management
- ✅ MCP server for external integrations
- ✅ Responsive web interface with accessibility compliance
- ✅ Docker containerization with production-ready setup

### Performance Requirements
- ⚡ Video upload and processing within 2 minutes for 1-hour meetings
- ⚡ Real-time transcript highlighting with <100ms latency
- ⚡ API response times <500ms for most endpoints
- ⚡ Support for concurrent processing of multiple meetings
- ⚡ Video streaming with adaptive quality based on bandwidth

### Quality Requirements
- 🔒 Security: Pass OWASP security scan with no high-risk vulnerabilities
- 🧪 Testing: >90% code coverage with comprehensive test suite
- 📱 Accessibility: WCAG 2.1 AA compliance
- 🌐 Browser Support: Chrome, Firefox, Safari, Edge (latest 2 versions)
- 📊 Performance: Lighthouse score >90 for performance, accessibility, SEO

This comprehensive prompt provides everything needed to build a modern, feature-rich meeting transcription platform that significantly improves upon the original Streamlit-based version while incorporating all requested features including video synchronization, speaker diarization, email integration, and advanced AI capabilities.