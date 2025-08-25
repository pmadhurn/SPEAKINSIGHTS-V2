import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import VideoPlayer from '../components/video/VideoPlayer'
import VideoTimeline from '../components/video/VideoTimeline'

type Meeting = {
	id: number
	title: string
	description?: string
	status?: string
	audio_path?: string
	transcript?: string
}

type Speaker = {
	id: number
	meeting_id: number
	speaker_label: string
	speaker_name?: string
}

type Segment = {
	id: number
	meeting_id: number
	speaker_id: number
	start_time: number
	end_time: number
	text: string
}

const MeetingDetail = () => {
	const { id } = useParams()
	const [meeting, setMeeting] = useState<Meeting | null>(null)
	const [loading, setLoading] = useState(true)
	const [speakers, setSpeakers] = useState<Speaker[] | null>(null)
	const [segments, setSegments] = useState<Segment[] | null>(null)
	const base = import.meta.env.VITE_API_URL || 'http://localhost:8000'
	const [seekTo, setSeekTo] = useState<number | undefined>(undefined)

	const refresh = () => {
		fetch(`${base}/api/v1/meetings/${id}`)
			.then((r) => r.json())
			.then(setMeeting)
			.finally(() => setLoading(false))
	}

	useEffect(() => { refresh() }, [id])

	useEffect(() => {
		if (!id) return
		fetch(`${base}/api/v1/speakers/${id}`)
			.then((r) => r.json())
			.then(setSpeakers)
		fetch(`${base}/api/v1/speakers/${id}/segments`)
			.then((r) => r.json())
			.then(setSegments)
	}, [id])

	const extract = async () => {
		await fetch(`${base}/api/v1/video/${id}/extract-audio`, { method: 'POST' })
		refresh()
	}

	const transcribe = async () => {
		await fetch(`${base}/api/v1/video/${id}/transcribe`, { method: 'POST' })
		refresh()
	}

	if (loading) return <p>Loading...</p>
	if (!meeting) return <p>Not found</p>

	return (
		<div style={{ padding: 16 }}>
			<p><Link to="/meetings">← Back</Link></p>
			<h2>{meeting.title}</h2>
			<p>Status: <strong>{meeting.status}</strong></p>
			<div style={{ display: 'flex', gap: 12, margin: '12px 0' }}>
				<button onClick={extract}>Extract audio</button>
				<button onClick={transcribe}>Transcribe (placeholder)</button>
			</div>
			{meeting.file_path && (
				<div>
					<h3>Video</h3>
					<VideoPlayer src={`${base}/uploads/${meeting.file_path.split('/').pop()}`} currentTime={seekTo} />
					<div style={{ marginTop: 8 }}>
						<VideoTimeline segments={(segments || []).map(s => ({...s, speaker_label: (speakers || []).find(sp => sp.id === s.speaker_id)?.speaker_label }))} onSeek={(t) => setSeekTo(t)} />
					</div>
				</div>
			)}
			{meeting.transcript && (
				<div>
					<h3>Transcript</h3>
					<pre style={{ whiteSpace: 'pre-wrap' }}>{meeting.transcript}</pre>
				</div>
			)}
			<div>
				<h3>Speakers</h3>
				{speakers?.map((s) => (
					<div key={s.id}>{s.speaker_label} {s.speaker_name ? `(${s.speaker_name})` : ''}</div>
				))}
				<h3>Segments</h3>
				{segments?.map((seg) => (
					<div key={seg.id}>
						<button onClick={() => setSeekTo(seg.start_time)} style={{ marginRight: 8 }}>▶</button>
						[{seg.start_time.toFixed(2)}s - {seg.end_time.toFixed(2)}s] {seg.text}
					</div>
				))}
				<button onClick={async () => {
					await fetch(`${base}/api/v1/speakers/${id}/diarize`, { method: 'POST' })
					const [spk, segs] = await Promise.all([
						fetch(`${base}/api/v1/speakers/${id}`).then(r => r.json()),
						fetch(`${base}/api/v1/speakers/${id}/segments`).then(r => r.json()),
					])
					setSpeakers(spk)
					setSegments(segs)
				}}>Generate placeholder diarization</button>
			</div>
		</div>
	)
}

export default MeetingDetail


