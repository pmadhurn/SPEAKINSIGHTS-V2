type Segment = {
	id: number
	start_time: number
	end_time: number
	speaker_id: number
	speaker_label?: string
	text: string
}

type Props = {
	segments: Segment[]
	onSeek: (time: number) => void
	width?: number
	height?: number
}

const colors = [
	'#4f46e5', '#16a34a', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7', '#84cc16', '#f43f5e'
]

const VideoTimeline = ({ segments, onSeek, width = 640, height = 24 }: Props) => {
	if (!segments || segments.length === 0) return null
	const duration = Math.max(...segments.map(s => s.end_time)) || 1
	const speakerIdToColor = new Map<number, string>()
	let colorIdx = 0
	for (const seg of segments) {
		if (!speakerIdToColor.has(seg.speaker_id)) {
			speakerIdToColor.set(seg.speaker_id, colors[colorIdx % colors.length])
			colorIdx++
		}
	}
	return (
		<div style={{ width, height, background: '#eee', borderRadius: 4, overflow: 'hidden', display: 'flex' }}>
			{segments.map(seg => {
				const segDuration = Math.max(0, seg.end_time - seg.start_time)
				const flexGrow = segDuration / duration
				const color = speakerIdToColor.get(seg.speaker_id) as string
				return (
					<div key={seg.id}
						onClick={() => onSeek(seg.start_time)}
						title={`[${seg.start_time.toFixed(2)}-${seg.end_time.toFixed(2)}] ${seg.text}`}
						style={{ flexGrow, background: color, cursor: 'pointer' }}
					/>
				)
			})}
		</div>
	)
}

export default VideoTimeline


