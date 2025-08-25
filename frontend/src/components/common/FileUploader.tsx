import { useCallback, useState } from 'react'

export const FileUploader = () => {
	const [dragOver, setDragOver] = useState(false)
	const [message, setMessage] = useState<string>("")

	const onDrop = useCallback(async (ev: React.DragEvent<HTMLDivElement>) => {
		ev.preventDefault()
		setDragOver(false)
		const file = ev.dataTransfer.files?.[0]
		if (!file) return
		const form = new FormData()
		form.append('file', file)
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/upload/file`, {
				method: 'POST',
				body: form,
			})
			if (!res.ok) throw new Error('Upload failed')
			const data = await res.json()
			setMessage(`Uploaded. Meeting ID: ${data.meeting_id}`)
		} catch (e) {
			setMessage('Upload error')
		}
	}, [])

	return (
		<div
			onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
			onDragLeave={() => setDragOver(false)}
			onDrop={onDrop}
			style={{
				border: '2px dashed #888',
				padding: '24px',
				borderRadius: 8,
				background: dragOver ? '#f5f5f5' : 'transparent',
				textAlign: 'center'
			}}
		>
			<p>Drag and drop a file here to upload</p>
			{message && <p><strong>{message}</strong></p>}
		</div>
	)
}

export default FileUploader


