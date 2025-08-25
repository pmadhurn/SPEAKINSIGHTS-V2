import { useEffect, useRef, useState, useCallback } from 'react'

type Props = {
	src: string
	currentTime?: number
	onTimeUpdate?: (t: number) => void
}

const VideoPlayer = ({ src, currentTime, onTimeUpdate }: Props) => {
	const ref = useRef<HTMLVideoElement | null>(null)
  const [playbackRate, setPlaybackRate] = useState<number>(1)

  const applyRate = useCallback((rate: number) => {
    setPlaybackRate(rate)
    if (ref.current) ref.current.playbackRate = rate
  }, [])

	useEffect(() => {
		if (ref.current && typeof currentTime === 'number') {
			ref.current.currentTime = currentTime
		}
	}, [currentTime])

  useEffect(() => {
    applyRate(playbackRate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!ref.current) return
      switch (e.key.toLowerCase()) {
        case ' ': // space toggles play/pause
          e.preventDefault()
          if (ref.current.paused) ref.current.play()
          else ref.current.pause()
          break
        case 'arrowright':
          ref.current.currentTime = Math.min((ref.current.currentTime || 0) + 5, (ref.current.duration || 0))
          break
        case 'arrowleft':
          ref.current.currentTime = Math.max((ref.current.currentTime || 0) - 5, 0)
          break
        case 'arrowup':
          e.preventDefault()
          applyRate(Math.min(playbackRate + 0.25, 3))
          break
        case 'arrowdown':
          e.preventDefault()
          applyRate(Math.max(playbackRate - 0.25, 0.25))
          break
        case 'p':
          // toggle Picture-in-Picture
          // @ts-ignore
          if (document.pictureInPictureElement) {
            // @ts-ignore
            document.exitPictureInPicture?.()
          } else {
            // @ts-ignore
            ref.current.requestPictureInPicture?.()
          }
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [applyRate, playbackRate])

	return (
		<div>
			<video ref={ref} src={src} controls width={640} onTimeUpdate={(e) => onTimeUpdate?.((e.target as HTMLVideoElement).currentTime)} />
			<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
				<label>
					<span style={{ marginRight: 6 }}>Speed</span>
					<select value={playbackRate} onChange={(e) => applyRate(parseFloat(e.target.value))}>
						<option value={0.5}>0.5x</option>
						<option value={0.75}>0.75x</option>
						<option value={1}>1x</option>
						<option value={1.25}>1.25x</option>
						<option value={1.5}>1.5x</option>
						<option value={2}>2x</option>
						<option value={2.5}>2.5x</option>
						<option value={3}>3x</option>
					</select>
				</label>
				<button onClick={() => {
					// @ts-ignore
					if (document.pictureInPictureElement) {
						// @ts-ignore
						document.exitPictureInPicture?.()
					} else {
						// @ts-ignore
						ref.current?.requestPictureInPicture?.()
					}
				}}>PiP</button>
				<small style={{ color: '#555' }}>Space: play/pause • ←/→: -/+5s • ↑/↓: speed • P: PiP</small>
			</div>
		</div>
	)
}

export default VideoPlayer


