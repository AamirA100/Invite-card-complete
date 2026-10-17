import { useEffect, useRef } from 'react'
import { weddingData } from '../data/weddingData'
import './ThankYouSection.css'

function ThankYouSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="invitation-section thank-you-section" ref={sectionRef}>
      <div className="section-inner">
        <div className="thank-you-card wedding-card">
          <div className="floral-accent top">
            <FloralElement />
            <FloralElement />
            <FloralElement />
          </div>

          <div className="envelope-container">
            <Envelope />
            <p className="envelope-caption">A little note, just for you</p>
          </div>

          <div className="thank-you-content">
            <h2 className="thank-you-name">{weddingData.bride.name}</h2>
            
            <p className="thank-you-tagline">{weddingData.bride.tagline}</p>

            <div className="ornamental-divider">
              <span className="divider-flower">✦</span>
            </div>

            <p className="thank-you-message">
              Thank you for sharing in our joy. 
              Your presence makes our day complete.
            </p>
          </div>

          <div className="floral-accent bottom">
            <FloralElement />
            <FloralElement />
            <FloralElement />
          </div>
        </div>
      </div>
    </section>
  )
}

function Envelope() {
  return (
    <div className="envelope-scene3d">
      <div className="env-shadow" />
      <div className="env3d-body">
        {/* Invitation card peeking out of the envelope */}
        <div className="env3d-card">
          <div className="env3d-card-face">
            <RosetteMark />
            <span className="env3d-card-title">Thank You</span>
            <span className="env3d-card-line" />
          </div>
        </div>

        {/* Envelope back panel */}
        <div className="env3d-back" />

        {/* Front pocket */}
        <div className="env3d-pocket">
          <div className="env3d-pocket-left" />
          <div className="env3d-pocket-right" />
          <div className="env3d-pocket-front">
            <span className="env3d-pocket-ornament">&#10022;</span>
          </div>
        </div>

        {/* Flap */}
        <div className="env3d-flap">
          <div className="env3d-flap-inner">
            <RosetteMark small />
          </div>
        </div>

        {/* Wax seal */}
        <div className="env3d-seal">
          <span>N</span>
        </div>
      </div>
    </div>
  )
}

function RosetteMark({ small = false }) {
  const size = small ? 26 : 40
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="30"
          rx="11"
          ry="24"
          transform={`rotate(${deg} 50 52)`}
          fill="rgba(240, 205, 216, 0.55)"
          stroke="#c98fa4"
          strokeWidth="0.9"
        />
      ))}
      <circle cx="50" cy="52" r="10" fill="rgba(255,255,255,0.9)" stroke="#c12d47" strokeWidth="1.2" />
    </svg>
  )
}

function FloralElement() {
  return (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 35, height: 35, opacity: 0.5 }}>
      <path d="M25 5 C14 5 5 14 5 25 C5 36 14 45 25 48 C36 45 45 36 45 25 C45 14 36 5 25 5 Z" 
            stroke="#d4a5b8" strokeWidth="1.5" fill="rgba(212, 165, 184, 0.1)"/>
      <ellipse cx="25" cy="22" rx="4" ry="7" fill="rgba(212, 165, 184, 0.2)"/>
    </svg>
  )
}

export default ThankYouSection