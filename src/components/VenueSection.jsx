import { useEffect, useRef } from 'react'
import { weddingData } from '../data/weddingData'
import './VenueSection.css'

function VenueSection() {
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
    <section className="invitation-section venue-section" ref={sectionRef}>
      <div className="section-inner">
        <div className="venue-card wedding-card">
          <div className="venue-header">
            <div className="venue-icon">
              <VenueIcon />
            </div>
            <h2 className="section-heading">Venue</h2>
          </div>

          <div className="venue-divider"></div>

          <div className="venue-info">
            <p className="venue-name">{weddingData.venue.name}</p>
            <p className="venue-address">{weddingData.venue.address}</p>
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

          <div className="venue-footer">
            <FloralCorner />
            <FloralCorner />
          </div>
        </div>
      </div>
    </section>
  )
}

function VenueIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15 L30 50 L50 85 L70 50 Z" stroke="#d4a5b8" strokeWidth="2" fill="rgba(212, 165, 184, 0.1)"/>
      <circle cx="50" cy="50" r="18" stroke="#d4a5b8" strokeWidth="1.5" fill="rgba(212, 165, 184, 0.1)"/>
      <path d="M50 35 L50 55 M40 45 L60 45" stroke="#d4a5b8" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function LocationIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function FloralCorner() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5 }}>
      <path d="M10 40 C10 25 20 15 35 15 C45 15 55 25 55 35" stroke="#d4a5b8" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="25" cy="22" rx="6" ry="9" fill="rgba(212, 165, 184, 0.2)"/>
      <ellipse cx="48" cy="20" rx="5" ry="7" fill="rgba(232, 197, 211, 0.2)"/>
    </svg>
  )
}

export default VenueSection