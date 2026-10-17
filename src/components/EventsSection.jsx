import { weddingData } from '../data/weddingData'
import './EventsSection.css'

export default function EventsSection() {
  const { events } = weddingData
  const { nikah, walima } = events

  return (
    <section className="invitation-section events-section" id="events-section">
      {/* Program Details Header */}
      <div className="events-main-header">
        <p className="events-eyebrow">
          <span className="eyebrow-line" />
          <span>PROGRAM DETAILS</span>
          <span className="eyebrow-line" />
        </p>
        <h2 className="events-title">Events &amp; Venues</h2>
        <div className="events-divider" aria-hidden="true">
          <span className="divider-flourish-char">❧</span>
          <span className="divider-dot" />
          <span className="divider-flourish-char">❦</span>
        </div>
      </div>

      <div className="event-cards-container">
        {/* Event 1: Nikah Ceremony */}
        <div className="wedding-card event-card event-nikah">
          <div className="event-badge">
            <span className="badge-star">✦</span>
            <h3 className="event-heading">NIKAH CEREMONY</h3>
            <span className="badge-star">✦</span>
          </div>

          {/* Mosque Silhouette / Illustration */}
          <div className="event-illustration mosque-illustration" aria-hidden="true">
            <MosqueIllustration />
          </div>

          <div className="event-info-list">
            <div className="event-info-item">
              <span className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <div className="info-text-group">
                <span className="info-label">DATE</span>
                <span className="info-val">{nikah.date}</span>
              </div>
            </div>

            <div className="event-info-item">
              <span className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div className="info-text-group">
                <span className="info-label">TIME</span>
                <span className="info-val time-val">{nikah.time}</span>
              </div>
            </div>

            <div className="event-info-item">
              <span className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div className="info-text-group">
                <span className="info-label">VENUE</span>
                <span className="info-val venue-val">{nikah.venue}</span>
                <span className="info-subval">{nikah.location}</span>
              </div>
            </div>
          </div>

          <a
            href={nikah.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="maps-button"
            id="map-btn-nikah"
          >
            <LocationPinIcon />
            <span>View Location on Google Maps</span>
          </a>
        </div>

        {/* Event 2: Walima Ceremony */}
        <div className="wedding-card event-card event-walima">
          <div className="event-badge">
            <span className="badge-star">✦</span>
            <h3 className="event-heading">WALIMA CEREMONY</h3>
            <span className="badge-star">✦</span>
          </div>

          {/* Palace / Function Hall Illustration */}
          <div className="event-illustration hall-illustration" aria-hidden="true">
            <PalaceHallIllustration />
          </div>

          <div className="event-info-list">
            <div className="event-info-item">
              <span className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <div className="info-text-group">
                <span className="info-label">DATE</span>
                <span className="info-val">{walima.date}</span>
              </div>
            </div>

            <div className="event-info-item">
              <span className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div className="info-text-group">
                <span className="info-label">TIME</span>
                <span className="info-val time-val">{walima.time}</span>
              </div>
            </div>

            <div className="event-info-item">
              <span className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div className="info-text-group">
                <span className="info-label">VENUE</span>
                <span className="info-val venue-val">{walima.venue}</span>
                <span className="info-subval">{walima.address}</span>
              </div>
            </div>
          </div>

          <a
            href={walima.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="maps-button walima-maps-button"
            id="map-btn-walima"
          >
            <LocationPinIcon />
            <span>View Location on Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function MosqueIllustration() {
  return (
    <svg viewBox="0 0 200 110" fill="none" className="mosque-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mosqueGold" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#f5cf9e" />
          <stop offset="100%" stopColor="#d48c5b" />
        </linearGradient>
      </defs>
      {/* Central Grand Dome */}
      <path d="M 65 85 C 65 52 82 25 100 12 C 118 25 135 52 135 85 Z" fill="rgba(240, 190, 205, 0.45)" stroke="#b53e62" strokeWidth="1.2" />
      {/* Crescent atop central dome */}
      <path d="M 100 12 V 4" stroke="#c28b51" strokeWidth="1.2" />
      <circle cx="100" cy="3" r="2.5" fill="#f7cf9e" />

      {/* Side Domes */}
      <path d="M 38 85 C 38 65 50 48 65 42 C 65 65 65 85 65 85 Z" fill="rgba(245, 210, 222, 0.4)" stroke="#b53e62" strokeWidth="1" />
      <path d="M 135 85 C 135 65 150 48 162 42 C 162 65 162 85 162 85 Z" fill="rgba(245, 210, 222, 0.4)" stroke="#b53e62" strokeWidth="1" />

      {/* Left Minaret */}
      <rect x="18" y="24" width="14" height="66" fill="rgba(245, 210, 222, 0.45)" stroke="#b53e62" strokeWidth="1" />
      <polygon points="15,24 25,10 35,24" fill="#f5cf9e" stroke="#c28b51" strokeWidth="1" />
      <line x1="25" y1="10" x2="25" y2="4" stroke="#c28b51" strokeWidth="1" />
      <circle cx="25" cy="3" r="1.5" fill="#f5cf9e" />

      {/* Right Minaret */}
      <rect x="168" y="24" width="14" height="66" fill="rgba(245, 210, 222, 0.45)" stroke="#b53e62" strokeWidth="1" />
      <polygon points="165,24 175,10 185,24" fill="#f5cf9e" stroke="#c28b51" strokeWidth="1" />
      <line x1="175" y1="10" x2="175" y2="4" stroke="#c28b51" strokeWidth="1" />
      <circle cx="175" cy="3" r="1.5" fill="#f5cf9e" />

      {/* Base & Arches */}
      <rect x="15" y="85" width="170" height="15" fill="#fadbe5" stroke="#b53e62" strokeWidth="1" rx="2" />
      {/* Central Arch Portal */}
      <path d="M 88 85 V 60 Q 100 52 112 60 V 85 Z" fill="#8c2442" opacity="0.8" />
      <path d="M 50 85 V 68 Q 58 62 66 68 V 85 Z" fill="#8c2442" opacity="0.65" />
      <path d="M 134 85 V 68 Q 142 62 150 68 V 85 Z" fill="#8c2442" opacity="0.65" />
    </svg>
  )
}

function PalaceHallIllustration() {
  return (
    <svg viewBox="0 0 200 100" fill="none" className="hall-svg" xmlns="http://www.w3.org/2000/svg">
      {/* Grand Nizam Palace Canopy / Marquee Roof */}
      <path d="M 20 48 L 100 14 L 180 48 Z" fill="rgba(240, 190, 205, 0.45)" stroke="#b53e62" strokeWidth="1.2" />
      {/* Roof Crest */}
      <circle cx="100" cy="14" r="4.5" fill="#f5cf9e" stroke="#c28b51" strokeWidth="1" />

      {/* Ornate Palace Pillars */}
      <rect x="35" y="48" width="10" height="44" fill="#fadbe5" stroke="#b53e62" strokeWidth="1" />
      <rect x="75" y="48" width="10" height="44" fill="#fadbe5" stroke="#b53e62" strokeWidth="1" />
      <rect x="115" y="48" width="10" height="44" fill="#fadbe5" stroke="#b53e62" strokeWidth="1" />
      <rect x="155" y="48" width="10" height="44" fill="#fadbe5" stroke="#b53e62" strokeWidth="1" />

      {/* Crystal Chandelier hanging inside center */}
      <path d="M 100 30 V 46" stroke="#c28b51" strokeWidth="1.2" />
      <polygon points="93,46 100,56 107,46" fill="#ffeaa7" stroke="#c28b51" strokeWidth="0.8" />
      <circle cx="100" cy="50" r="2" fill="#ffffff" />

      {/* Base platform */}
      <rect x="15" y="92" width="170" height="8" fill="#e89cb2" stroke="#b53e62" strokeWidth="1" rx="2" />

      {/* Draped Curtains Festoon */}
      <path d="M 35 48 Q 55 60 75 48" stroke="#b53e62" strokeWidth="1.2" fill="none" />
      <path d="M 75 48 Q 95 60 115 48" stroke="#b53e62" strokeWidth="1.2" fill="none" />
      <path d="M 115 48 Q 135 60 155 48" stroke="#b53e62" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-pin-icon">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}