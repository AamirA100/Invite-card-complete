import { useState } from 'react'
import { weddingData } from '../data/weddingData'
import { weddingAudio } from '../utils/audioPlayer'
import './OpeningScreen.css'

export default function OpeningScreen({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpenClick = () => {
    if (isOpening) return
    setIsOpening(true)
    // Start audio immediately in direct user gesture callstack to satisfy browser autoplay policy
    weddingAudio.play()
    // Allow cinematic dissolve/lift animation to play before revealing the stage
    setTimeout(() => {
      onOpen()
    }, 1200)
  }

  return (
    <div className={`opening-screen ${isOpening ? 'fade-out' : ''}`}>
      {/* Background Starry Dust & Vignette */}
      <div className="opening-stars" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="opening-star"
            style={{
              top: `${(i * 17) % 96}%`,
              left: `${(i * 23) % 94}%`,
              animationDelay: `${(i * 0.3) % 4}s`,
              animationDuration: `${2.5 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      <div className="opening-vignette" />

      {/* Centerpiece Container */}
      <div className="opening-centerpiece">
        {/* Sacred Bismillah Calligraphy */}
        <div className="opening-bismillah" title="In the name of Allah, the Most Gracious, the Most Merciful">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>

        {/* Subtitle / Royal Crest */}
        <div className="opening-subheading">
          <span className="opening-line" />
          <span className="opening-sub-text">DAWAT&#8209;E&#8209;WALIMA INVITATION</span>
          <span className="opening-line" />
        </div>

        <h1 className="opening-names">
          <span>{weddingData.groom.name}</span>
          <span className="opening-ampersand">&amp;</span>
          <span>{weddingData.bride.name}</span>
        </h1>

        {/* Circular Interactive Button */}
        <div className="opening-circle-wrapper">
          {/* Animated decorative rings */}
          <div className="ring ring-outer" />
          <div className="ring ring-middle" />
          <div className="ring ring-glow" />

          <button
            type="button"
            className="opening-circle-btn"
            onClick={handleOpenClick}
            aria-label="Open Wedding Invitation"
            id="open-invitation-btn"
          >
            <div className="btn-inner-shine" />
            <div className="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="wax-envelope-icon">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="btn-main-text">OPEN INVITATION</span>
            <span className="btn-sub-text">✦ TAP TO ENTER ✦</span>
          </button>
        </div>

        {/* Welcome notice */}
        <div className="opening-date-notice">
          <p className="opening-welcome-text">✦ YOU ARE CORDIALLY INVITED ✦</p>
          <p className="opening-blessing-text">Join us in celebrating this blessed union</p>
        </div>
      </div>
    </div>
  )
}