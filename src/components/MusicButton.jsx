import { useEffect, useState } from 'react'
import { weddingAudio } from '../utils/audioPlayer'
import './MusicButton.css'

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(weddingAudio.isPlaying)

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((status) => {
      setIsPlaying(status)
    })
    return unsubscribe
  }, [])

  const handleToggle = () => {
    weddingAudio.toggle()
  }

  return (
    <div className="floating-music-wrapper">
      <button
        type="button"
        className={`floating-music-btn ${isPlaying ? 'is-playing' : 'is-paused'}`}
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause Wedding Music' : 'Play Wedding Music'}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
        id="floating-music-btn"
      >
        {/* Pulsing acoustic rings when active */}
        {isPlaying && <span className="music-pulse-ring" />}

        {/* Music Disc with Note Icon */}
        <div className="music-disc-inner">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`music-note-glyph ${isPlaying ? 'spinning' : ''}`}
            aria-hidden="true"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>

        {/* Playing equalizer bars indicator */}
        <div className="equalizer-indicator" aria-hidden="true">
          <span className={`bar bar-1 ${isPlaying ? 'bar-anim' : ''}`} />
          <span className={`bar bar-2 ${isPlaying ? 'bar-anim' : ''}`} />
          <span className={`bar bar-3 ${isPlaying ? 'bar-anim' : ''}`} />
        </div>
      </button>
    </div>
  )
}