import { useEffect, useRef } from 'react'
import { weddingData } from '../data/weddingData'
import './ValimaSection.css'

function ValimaSection() {
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
    <section className="invitation-section valima-section" ref={sectionRef}>
      <div className="section-inner">
        <div className="valima-card wedding-card elevated">
          <div className="floral-border top">
            <FloralElement />
            <FloralCenter />
            <FloralElement />
          </div>

          <div className="valima-content">
            <p className="valima-label">VALIMA DINNER</p>
            
            <h2 className="valima-name">Walima Reception</h2>

            <div className="ornamental-divider">
              <span className="divider-flower">✦</span>
            </div>

            <div className="valima-details">
              <div className="detail-item">
                <span className="detail-icon">
                  <CalendarIcon />
                </span>
                <div className="detail-text">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{weddingData.valima.date}</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">
                  <ClockIcon />
                </span>
                <div className="detail-text">
                  <span className="detail-label">Time</span>
                  <span className="detail-value time-value">{weddingData.valima.time}</span>
                </div>
              </div>
            </div>

            <div className="venue-info">
              <span className="detail-icon">
                <LocationIcon />
              </span>
              <div className="detail-text">
                <span className="detail-label">Venue</span>
                <span className="detail-value venue-name">{weddingData.valima.venue}</span>
                <span className="detail-value venue-address">{weddingData.valima.address}</span>
              </div>
            </div>

            <a 
              href={weddingData.venue.mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="location-btn btn btn-primary"
            >
              <LocationIcon className="btn-icon" />
              View Location
            </a>
          </div>

          <div className="floral-border bottom">
            <FloralElement />
            <FloralCenter />
            <FloralElement />
          </div>
        </div>
      </div>
    </section>
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

function FloralCenter() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 45, height: 45, opacity: 0.6 }}>
      <path d="M30 5 C18 5 8 15 8 27 C8 39 18 49 30 55 C42 49 52 39 52 27 C52 15 42 5 30 5 Z" 
            stroke="#d4a5b8" strokeWidth="2" fill="rgba(212, 165, 184, 0.15)"/>
      <path d="M30 15 C22 15 16 21 16 29 C16 37 22 43 30 46 C38 43 44 37 44 29 C44 21 38 15 30 15 Z" 
            stroke="#e8c5d3" strokeWidth="1.5" fill="rgba(232, 197, 211, 0.2)"/>
      <ellipse cx="30" cy="27" rx="8" ry="11" fill="rgba(212, 165, 184, 0.25)"/>
      <ellipse cx="30" cy="27" rx="4" ry="6" fill="rgba(232, 197, 211, 0.35)"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

export default ValimaSection