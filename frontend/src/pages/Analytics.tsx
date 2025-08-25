import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Stats = {
	meeting_id: number
	title: string
	status: string
	speaker_count: number
	segment_count: number
	duration_seconds?: number
}

const Analytics = () => {
	const { id } = useParams()
	const base = import.meta.env.VITE_API_URL || 'http://localhost:8000'
	const [stats, setStats] = useState<Stats | null>(null)
	useEffect(() => {
		if (!id) return
		fetch(`${base}/api/v1/analytics/meeting/${id}`)
			.then(r => r.json())
			.then(setStats)
	}, [id])

	if (!id) return <p>Missing id</p>
	if (!stats) return <p>Loading analytics...</p>

	return (
		<div style={{ padding: 16 }}>
			<h2>Analytics — {stats.title}</h2>
			<ul>
				<li>Status: {stats.status}</li>
				<li>Speakers: {stats.speaker_count}</li>
				<li>Segments: {stats.segment_count}</li>
				<li>Duration (s): {stats.duration_seconds ?? 'n/a'}</li>
			</ul>
		</div>
	)
}

export default Analytics


