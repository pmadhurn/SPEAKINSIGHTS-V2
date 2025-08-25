-- PostgreSQL schema initialization for Speakinsights-V2.0

-- Meetings table
CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration INTEGER,
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
CREATE TABLE IF NOT EXISTS speakers (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    speaker_label VARCHAR(50) NOT NULL,
    speaker_name VARCHAR(100),
    speaker_role VARCHAR(100),
    total_speaking_time INTEGER,
    word_count INTEGER,
    segment_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Speaker segments table
CREATE TABLE IF NOT EXISTS speaker_segments (
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
CREATE TABLE IF NOT EXISTS action_items (
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
CREATE TABLE IF NOT EXISTS email_participants (
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
CREATE TABLE IF NOT EXISTS webhook_logs (
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
CREATE TABLE IF NOT EXISTS video_sync (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    video_duration DECIMAL(10,3),
    audio_offset DECIMAL(10,3) DEFAULT 0,
    sync_points JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


