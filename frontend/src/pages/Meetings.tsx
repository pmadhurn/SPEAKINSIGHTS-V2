import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Meeting = {
	id: number
	title: string
	description?: string
	status?: string
}

const Meetings = () => {
	const [meetings, setMeetings] = useState<Meeting[]>([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/meetings/`)
			.then((r) => r.json())
			.then(setMeetings)
			.finally(() => setLoading(false))
	}, [])

	if (loading) return <p>Loading...</p>

	return (
		<div style={{ padding: 16 }}>
			<h2>Meetings</h2>
			<ul>
				{meetings.map((m) => (
					<li key={m.id}>
						<Link to={`/meetings/${m.id}`}>{m.title}</Link> — {m.status}
					</li>
				))}
			</ul>
			<p><Link to="/">Home</Link></p>
		</div>
	)
}

export default Meetings


