import { useEffect, useRef, useState, useCallback } from 'react'
import { weddingData } from '../data/weddingData'
import './ScratchDate.css'

export default function ScratchDate() {
  const { scratch } = weddingData
  const [revealed, setRevealed] = useState({
    day: false,
    month: false,
    year: false
  })

  const allRevealed = revealed.day && revealed.month && revealed.year

  const handleCircleRevealed = useCallback((id) => {
    setRevealed((prev) => ({ ...prev, [id]: true }))
  }, [])

  const handleRevealAll = () => {
    setRevealed({ day: true, month: true, year: true })
  }

  return (
    <section className="invitation-section scratch-section" id="scratch-section">
      <div className="wedding-card scratch-card">
        {/* Top Decorative Sparkle */}
        <div className="scratch-badge-pill">
          <span className="badge-star">✦</span>
          <span className="badge-text">{scratch.badge}</span>
          <span className="badge-star">✦</span>
        </div>

        <h2 className="scratch-main-title">{scratch.heading}</h2>
        <p className="scratch-subtitle">{scratch.instruction}</p>

        {/* Three Interactive Scratch Circles */}
        <div className="scratch-circles-grid">
          {scratch.parts.map((part) => (
            <ScratchCircle
              key={part.id}
              part={part}
              isRevealed={revealed[part.id]}
              onRevealed={() => handleCircleRevealed(part.id)}
            />
          ))}
        </div>

        {/* Quick reveal button for accessibility */}
        {!allRevealed ? (
          <button
            type="button"
            className="scratch-reveal-all-btn"
            onClick={handleRevealAll}
          >
            ✦ Auto-Reveal All Circles ✦
          </button>
        ) : (
          <div className="scratch-complete-badge">
            <span className="badge-flower">🌸</span>
            <span className="badge-text">Date Revealed With Blessings</span>
            <span className="badge-flower">🌸</span>
          </div>
        )}
      </div>
    </section>
  )
}

function ScratchCircle({ part, isRevealed, onRevealed }) {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const isDoneRef = useRef(false)

  // Initialize Canvas Scratch Surface
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Draw luxury metallic rose-gold foil
    const grad = ctx.createRadialGradient(
      width * 0.35,
      height * 0.35,
      10,
      width * 0.5,
      height * 0.5,
      width * 0.55
    )
    grad.addColorStop(0, '#fde1ea')
    grad.addColorStop(0.3, '#f19db5')
    grad.addColorStop(0.7, '#d86586')
    grad.addColorStop(1, '#b53e62')

    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, width / 2 - 2, 0, Math.PI * 2)
    ctx.fill()

    // Foil glitter speckles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'
    for (let i = 0; i < 40; i++) {
      const rx = (Math.sin(i * 99) * 0.5 + 0.5) * (width - 24) + 12
      const ry = (Math.cos(i * 77) * 0.5 + 0.5) * (height - 24) + 12
      ctx.fillRect(rx, ry, 2, 2)
    }

    // Border ring on foil
    ctx.strokeStyle = '#fcd0dd'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, width / 2 - 8, 0, Math.PI * 2)
    ctx.stroke()

    // Scratch prompt text
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 12px Montserrat, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(100, 20, 45, 0.6)'
    ctx.shadowBlur = 4
    ctx.fillText('SCRATCH', width / 2, height / 2 - 6)

    ctx.font = 'bold 9px Montserrat, sans-serif'
    ctx.fillText('✦ HERE ✦', width / 2, height / 2 + 10)
    ctx.shadowBlur = 0
  }, [])

  // Check scratch percentage
  const checkScratchPercentage = () => {
    if (isDoneRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    const imageData = ctx.getImageData(0, 0, width, height)
    const pixels = imageData.data
    let transparentCount = 0
    const totalPixels = pixels.length / 4

    // Sample every 4th pixel for high performance
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparentCount += 4
      }
    }

    const scratchedRatio = transparentCount / totalPixels
    if (scratchedRatio > 0.38) {
      isDoneRef.current = true
      onRevealed()
    }
  }

  const canvasRectRef = useRef(null)
  const moveCountRef = useRef(0)

  // Pointer Scratch Handlers
  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current
    if (!canvas || isDoneRef.current) return
    const ctx = canvas.getContext('2d')
    const rect = canvasRectRef.current || canvas.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * canvas.width
    const y = ((clientY - rect.top) / rect.height) * canvas.height

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 18, 0, Math.PI * 2)
    ctx.fill()
  }

  const handlePointerDown = (e) => {
    isDrawing.current = true
    if (canvasRef.current) {
      canvasRectRef.current = canvasRef.current.getBoundingClientRect()
    }
    scratchAt(e.clientX, e.clientY)
  }

  const handlePointerMove = (e) => {
    if (!isDrawing.current) return
    scratchAt(e.clientX, e.clientY)
    moveCountRef.current += 1
    // Only check pixel readback every 8 moves to avoid GPU stalls on mobile
    if (moveCountRef.current % 8 === 0) {
      checkScratchPercentage()
    }
  }

  const handlePointerUp = () => {
    isDrawing.current = false
    canvasRectRef.current = null
    checkScratchPercentage()
  }

  return (
    <div className={`scratch-circle-item ${isRevealed ? 'is-revealed' : ''}`}>
      {/* Underlying Hidden Date Card Decorated with Flowers */}
      <div className="underlying-date-card">
        {/* Blooming Floral Wreath Border */}
        <div className="circle-flower-wreath" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" className="wreath-svg">
            {/* Delicate Rose Blossoms around circle */}
            <circle cx="60" cy="8" r="6" fill="#f8b6c8" stroke="#b03a58" strokeWidth="0.8" />
            <circle cx="60" cy="8" r="2.5" fill="#8c2442" />

            <circle cx="20" cy="30" r="5" fill="#fad2dc" stroke="#b03a58" strokeWidth="0.8" />
            <circle cx="100" cy="30" r="5" fill="#fad2dc" stroke="#b03a58" strokeWidth="0.8" />

            <circle cx="10" cy="65" r="4.5" fill="#f8b6c8" stroke="#b03a58" strokeWidth="0.8" />
            <circle cx="110" cy="65" r="4.5" fill="#f8b6c8" stroke="#b03a58" strokeWidth="0.8" />

            <circle cx="28" cy="100" r="5" fill="#fad2dc" stroke="#b03a58" strokeWidth="0.8" />
            <circle cx="92" cy="100" r="5" fill="#fad2dc" stroke="#b03a58" strokeWidth="0.8" />

            <circle cx="60" cy="112" r="6" fill="#f8b6c8" stroke="#b03a58" strokeWidth="0.8" />
            <circle cx="60" cy="112" r="2.5" fill="#8c2442" />

            {/* Golden Leaves Stem */}
            <path d="M 60 8 C 15 15 5 60 28 100" stroke="#d5a065" strokeWidth="1" strokeDasharray="2 3" />
            <path d="M 60 8 C 105 15 115 60 92 100" stroke="#d5a065" strokeWidth="1" strokeDasharray="2 3" />
          </svg>
        </div>

        {/* Floral Top Accent */}
        <span className="flower-top-accent">🌸</span>
        <span className="card-sub-label">{part.label}</span>
        <span className="card-date-value">{part.value}</span>
        <span className="flower-bottom-accent">❦</span>
      </div>

      {/* Interactive Scratch Canvas */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          width={130}
          height={130}
          className="scratch-canvas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          title="Scratch to reveal date"
        />
      )}
    </div>
  )
}
