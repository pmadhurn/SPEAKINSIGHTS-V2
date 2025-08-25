import { useEffect, useRef } from 'react'

type Props = {
	src: string
	currentTime?: number
	onTimeUpdate?: (t: number) => void
}

const VideoPlayer = ({ src, currentTime, onTimeUpdate }: Props) => {
	const ref = useRef<HTMLVideoElement | null>(null)

	useEffect(() => {
		if (ref.current && typeof currentTime === 'number') {
			ref.current.currentTime = currentTime
		}
	}, [currentTime])

	return (
		<video ref={ref} src={src} controls width={640} onTimeUpdate={(e) => onTimeUpdate?.((e.target as HTMLVideoElement).currentTime)} />
	)
}

export default VideoPlayer


