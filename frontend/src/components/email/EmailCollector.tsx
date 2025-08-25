import { useEffect, useState } from 'react'

type Participant = {
	id: number
	meeting_id: number
	email: string
	name?: string
	role?: string
}

type Props = { meetingId: number }

const EmailCollector = ({ meetingId }: Props) => {
	const base = import.meta.env.VITE_API_URL || 'http://localhost:8000'
	const [list, setList] = useState<Participant[]>([])
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [role, setRole] = useState('')
	const [error, setError] = useState('')

	const refresh = () => {
		fetch(`${base}/api/v1/email/${meetingId}`)
			.then(r => r.json())
			.then(setList)
	}

	useEffect(() => { refresh() }, [meetingId])

	const add = async () => {
		setError('')
		if (!email) { setError('Email required'); return }
		try {
			const res = await fetch(`${base}/api/v1/email/${meetingId}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, name, role })
			})
			if (!res.ok) throw new Error('Failed to add')
			setEmail(''); setName(''); setRole('')
			refresh()
		} catch (e) {
			setError('Add failed')
		}
	}

	return (
		<div>
			<h3>Participants</h3>
			<div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
				<input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
				<input placeholder="role" value={role} onChange={(e) => setRole(e.target.value)} />
				<button onClick={add}>Add</button>
			</div>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<ul>
				{list.map(p => (
					<li key={p.id}>{p.email} {p.name ? `(${p.name})` : ''} {p.role ? `- ${p.role}` : ''}</li>
				))}
			</ul>
		</div>
	)
}

export default EmailCollector


