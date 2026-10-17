import { weddingData } from '../data/weddingData'
import './ComplimentsSection.css'

export default function ComplimentsSection() {
  const { compliments } = weddingData

  return (
    <section className="invitation-section compliments-section" id="compliments-section">
      <div className="wedding-card compliments-card">
        {/* Top Rosette Ornament */}
        <div className="compliments-ornament-top" aria-hidden="true">
          <svg viewBox="0 0 140 30" fill="none" className="compliments-ornament-svg">
            <path d="M 10 15 H 50 Q 70 5 90 15 H 130" stroke="#d493a7" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="70" cy="12" r="3.5" fill="#8c2442" />
            <circle cx="70" cy="12" r="7" stroke="#d493a7" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Heading */}
        <div className="compliments-header">
          <p className="compliments-eyebrow">WITH BEST</p>
          <h2 className="compliments-title">COMPLIMENTS FROM</h2>
        </div>

        <div className="compliments-divider" aria-hidden="true">
          <span className="comp-line" />
          <span className="comp-diamond">❖</span>
          <span className="comp-line" />
        </div>

        {/* Family & Relative Names List Vertically */}
        <div className="compliments-list">
          {compliments.members.map((member, index) => (
            <div key={index} className="compliment-item">
              <h3 className="compliment-name">{member.name}</h3>
              {member.detail && <p className="compliment-detail">{member.detail}</p>}
            </div>
          ))}
        </div>

        {/* Near & Dear Tagline */}
        <div className="near-dear-banner">
          <span className="near-dear-text">{compliments.nearAndDear}</span>
        </div>

        {/* Bottom Flourish */}
        <div className="compliments-bottom-flourish" aria-hidden="true">
          <svg viewBox="0 0 80 20" fill="none">
            <path d="M 5 10 Q 40 22 75 10" stroke="#d493a7" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="40" cy="15" r="2.5" fill="#8c2442" />
          </svg>
        </div>
      </div>
    </section>
  )
}
