import { useState } from 'react'
import { weddingData } from '../data/weddingData'
import Confetti from './Confetti'
import './RSVPSection.css'

export default function RSVPSection() {
  const { rsvp } = weddingData
  const [selectedId, setSelectedId] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleOptionClick = (option) => {
    setSelectedId(option.id)
    setShowConfetti(true)
  }

  const selectedOption = rsvp.options.find((opt) => opt.id === selectedId)

  return (
    <section className="invitation-section rsvp-section" id="rsvp-section">
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      <div className="wedding-card rsvp-card">
        {/* Decorative Top Accent */}
        <div className="rsvp-badge">
          <span className="rsvp-star">✦</span>
          <span className="rsvp-badge-text">R.S.V.P</span>
          <span className="rsvp-star">✦</span>
        </div>

        <h2 className="rsvp-heading">{rsvp.heading}</h2>
        <p className="rsvp-subheading">{rsvp.subheading}</p>

        {/* Three Large Touch-Friendly Buttons */}
        <div className="rsvp-buttons-group">
          {rsvp.options.map((option) => {
            const isSelected = selectedId === option.id
            return (
              <button
                key={option.id}
                type="button"
                className={`rsvp-action-btn ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleOptionClick(option)}
                aria-pressed={isSelected}
              >
                <span className="btn-text">{option.text}</span>
                {isSelected && <span className="btn-selected-check">✓</span>}
              </button>
            )
          })}
        </div>

        {/* Confirmation Message */}
        {selectedOption && (
          <div className="rsvp-confirmation-card">
            <div className="confirmation-hearts" aria-hidden="true">
              <span>🌸</span>
              <span>💍</span>
              <span>🌸</span>
            </div>
            <p className="confirmation-text">{selectedOption.confirmation}</p>
            <p className="confirmation-subtext">Thank you for letting us know!</p>
          </div>
        )}
      </div>
    </section>
  )
}