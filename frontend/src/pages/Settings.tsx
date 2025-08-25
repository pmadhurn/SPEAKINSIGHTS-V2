import { useEffect, useState } from 'react'

const Settings = () => {
	const [api, setApi] = useState('')
	const [whModel, setWhModel] = useState('small')
	const [useWh, setUseWh] = useState(false)
	const [webhook, setWebhook] = useState('')

	useEffect(() => {
		setApi(localStorage.getItem('API_BASE_URL') || '')
		setWebhook(localStorage.getItem('N8N_WEBHOOK_URL') || '')
		setWhModel(localStorage.getItem('WHISPER_MODEL') || 'small')
		setUseWh((localStorage.getItem('USE_FASTER_WHISPER') || 'false') === 'true')
	}, [])

	const save = () => {
		if (api) localStorage.setItem('API_BASE_URL', api); else localStorage.removeItem('API_BASE_URL')
		if (webhook) localStorage.setItem('N8N_WEBHOOK_URL', webhook); else localStorage.removeItem('N8N_WEBHOOK_URL')
		localStorage.setItem('WHISPER_MODEL', whModel)
		localStorage.setItem('USE_FASTER_WHISPER', useWh ? 'true' : 'false')
		alert('Saved. Note: backend env must also be set server-side for real whisper.')
	}

	return (
		<div style={{ padding: 16 }}>
			<h2>Settings</h2>
			<div style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
				<label>
					<div>API Base URL</div>
					<input value={api} onChange={e => setApi(e.target.value)} placeholder="http://localhost:8000" />
				</label>
				<label>
					<div>Webhook URL (n8n)</div>
					<input value={webhook} onChange={e => setWebhook(e.target.value)} placeholder="https://your-n8n/webhook/..." />
				</label>
				<label>
					<input type="checkbox" checked={useWh} onChange={e => setUseWh(e.target.checked)} /> Use Faster-Whisper
				</label>
				<label>
					<div>Whisper Model</div>
					<select value={whModel} onChange={e => setWhModel(e.target.value)}>
						<option value="tiny">tiny</option>
						<option value="base">base</option>
						<option value="small">small</option>
						<option value="medium">medium</option>
						<option value="large-v2">large-v2</option>
					</select>
				</label>
				<button onClick={save}>Save</button>
			</div>
		</div>
	)
}

export default Settings


