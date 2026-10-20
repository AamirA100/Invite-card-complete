import { useState, useEffect, useRef } from 'react'
import { weddingData } from '../data/weddingData'
import './ThankYouEnvelope.css'

export default function ThankYouEnvelope() {
  const { thankYou, creator } = weddingData
  const [isHovered, setIsHovered] = useState(false)
  const [isAutoAnimated, setIsAutoAnimated] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    // Automatically trigger the animation immediately without delay when the section scrolls into view
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsAutoAnimated(true)
            observer.disconnect()
          }
        },
        {
          threshold: 0.1,
          rootMargin: '-10% 0px -25% 0px'
        }
      )

      if (sectionRef.current) {
        observer.observe(sectionRef.current)
      }

      return () => {
        observer.disconnect()
      }
    } else {
      // Fallback for environments without IntersectionObserver
      setIsAutoAnimated(true)
    }
  }, [])

  const isAnimated = isAutoAnimated || isHovered

  return (
    <section
      ref={sectionRef}
      className="invitation-section thank-you-envelope-section"
      id="thank-you-section"
    >
      <div className="thank-you-container">
        {/* Section Header */}
        <div className="thank-you-header">
          <span className="ty-sparkle">✦</span>
          <h2 className="ty-subtitle">GRATITUDE &amp; BLESSINGS</h2>
          <span className="ty-sparkle">✦</span>
        </div>

        {/* 3D Envelope Scene Container */}
        <div
          className={`envelope-3d-scene ${isAnimated ? 'scene-interactive' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onClick={() => setIsHovered(prev => !prev)}
        >
          {/* Soft Ground Shadow */}
          <div className="env-soft-shadow" />

          {/* 3D Envelope Structure */}
          <div className="env-3d-wrapper">
            {/* Back Panel of Envelope */}
            <div className="env-back-panel" />

            {/* Inner Thank You Card (Sliding Up) */}
            <div className="env-inner-card">
              <div className="card-ornament-header">
                <svg viewBox="0 0 100 24" fill="none" className="card-header-svg">
                  <path d="M 10 12 Q 50 2 90 12" stroke="#d493a7" strokeWidth="1.2" />
                  <circle cx="50" cy="8" r="3" fill="#8c2442" />
                </svg>
              </div>

              <h3 className="card-thank-you-text">{thankYou.title}</h3>
              <div className="card-message-divider">
                <span className="c-rule" />
                <span className="c-heart">❤</span>
                <span className="c-rule" />
              </div>
              <p className="card-message-text">{thankYou.message}</p>
              <p className="card-couple-sign">Aamir &amp; Tuba Ansari</p>
            </div>

            {/* Open Flap (Folded back in 3D) */}
            <div className="env-open-flap">
              <div className="flap-triangle" />
            </div>

            {/* Front Pocket (Left, Right, Bottom Triangles) */}
            <div className="env-front-pocket">
              <div className="pocket-left" />
              <div className="pocket-right" />
              <div className="pocket-bottom" />
              <div className="pocket-inner-shadow" />
            </div>

            {/* Satin Pink Ribbon & Bow */}
            <div className="env-ribbon-horizontal" />
            <div className="env-ribbon-bow">
              <span className="bow-loop left" />
              <span className="bow-loop right" />
            </div>

            {/* Golden Wax Seal Medallion */}
            <div className="env-wax-seal" title="Royal Wedding Seal">
              <div className="wax-seal-inner">
                <span className="wax-initials">A &amp; T</span>
              </div>
            </div>
          </div>
        </div>

        {/* Creator Credit Footer */}
        <footer className="invitation-footer">
          <div className="footer-credit-card">
            <a
              href="https://www.instagram.com/mazhar.x64?stkn=MTV1dWQ0c3Voc2M3dA=="
              target="_blank"
              rel="noopener noreferrer"
              className="creator-link"
              aria-label="Creator Instagram Profile"
            >
              <InstagramIcon />
              <span className="creator-username">{creator.instagram}</span>
            </a>
            <p className="creator-tagline">{creator.tagline}</p>
          </div>
        </footer>
      </div>
    </section>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ig-icon">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
