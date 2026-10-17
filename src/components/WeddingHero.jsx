import { useEffect, useRef, useState } from 'react'
import { weddingData } from '../data/weddingData'
import './WeddingHero.css'

export default function WeddingHero({ isOpened }) {
  const stageRef = useRef(null)
  const wrapperRef = useRef(null)
  const [curtainsOpen, setCurtainsOpen] = useState(false)

  // Theatrical quick delay so user first sees draped curtains before they dramatically part!
  useEffect(() => {
    if (isOpened) {
      const timer = setTimeout(() => {
        setCurtainsOpen(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setCurtainsOpen(false)
    }
  }, [isOpened])

  // High-performance 60fps 3D tilt with zero React re-renders
  const rafId = useRef(null)

  const handleMouseMove = (e) => {
    if (!stageRef.current || !wrapperRef.current || e.pointerType === 'touch') return
    const el = stageRef.current
    const w = el.clientWidth || 360
    const h = el.clientHeight || 600
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / w - 0.5
    const y = (e.clientY - rect.top) / h - 0.5

    if (rafId.current) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`
      }
    })
  }

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }
  }

  return (
    <section
      className={`wedding-hero-stage ${isOpened ? 'is-active' : ''} ${curtainsOpen ? 'curtains-open' : ''}`}
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Wedding Stage"
    >
      {/* 3D Perspective Canvas Container */}
      <div
        className="stage-3d-wrapper"
        ref={wrapperRef}
      >
        {/* Layer 1: Warm Stage Backdrop & Royal Arch */}
        <div className="layer layer-backdrop" aria-hidden="true">
          <div className="royal-arch-glow" />
          <div className="fairy-lights-string">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="fairy-light"
                style={{
                  left: `${(i / 15) * 100}%`,
                  top: `${Math.sin((i / 15) * Math.PI) * 18 + 5}px`,
                  animationDelay: `${(i * 0.2) % 2.5}s`
                }}
              />
            ))}
          </div>

          <svg className="stage-arch-svg" viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3d09d" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#d48c5b" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f7e1b5" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Islamic Trefoil Royal Arch */}
            <path
              d="M 50 480 V 220 C 50 140 120 70 200 40 C 280 70 350 140 350 220 V 480"
              stroke="url(#goldArchGrad)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 6"
            />
            <path
              d="M 68 480 V 225 C 68 155 130 90 200 65 C 270 90 332 155 332 225 V 480"
              stroke="url(#goldArchGrad)"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </div>

        {/* Layer 2: Hanging Crystal Chandeliers */}
        <div className="layer layer-chandelier" aria-hidden="true">
          <div className="chandelier-assembly">
            <svg viewBox="0 0 160 140" fill="none" className="chandelier-svg">
              <path d="M80 0 V35" stroke="#e0aa6d" strokeWidth="2" />
              <path d="M50 35 Q80 20 110 35" stroke="#e0aa6d" strokeWidth="2.5" />
              <path d="M30 65 Q80 45 130 65" stroke="#e0aa6d" strokeWidth="2" />
              <path d="M20 95 Q80 70 140 95" stroke="#e0aa6d" strokeWidth="1.5" />

              {/* Candles / Warm Lights */}
              <circle cx="30" cy="60" r="3.5" fill="#ffe299" className="candle-flame" />
              <circle cx="50" cy="52" r="3.5" fill="#ffe299" className="candle-flame" />
              <circle cx="80" cy="46" r="4" fill="#fff0b8" className="candle-flame main-flame" />
              <circle cx="110" cy="52" r="3.5" fill="#ffe299" className="candle-flame" />
              <circle cx="130" cy="60" r="3.5" fill="#ffe299" className="candle-flame" />

              {/* Crystals Hanging */}
              <path d="M80 35 L80 120" stroke="#fcead2" strokeWidth="1.2" strokeDasharray="3 3" />
              <polygon points="80,120 75,135 80,140 85,135" fill="#fef6eb" stroke="#e0aa6d" strokeWidth="0.8" />
              <polygon points="50,90 46,105 50,110 54,105" fill="#fef6eb" stroke="#e0aa6d" strokeWidth="0.8" />
              <polygon points="110,90 106,105 110,110 114,105" fill="#fef6eb" stroke="#e0aa6d" strokeWidth="0.8" />
              <polygon points="30,80 27,92 30,96 33,92" fill="#fef6eb" stroke="#e0aa6d" strokeWidth="0.8" />
              <polygon points="130,80 127,92 130,96 133,92" fill="#fef6eb" stroke="#e0aa6d" strokeWidth="0.8" />
            </svg>
          </div>
        </div>

        {/* Layer 3: Velvet Draped Curtains (Left & Right) with Valance */}
        <div className="layer layer-curtains" aria-hidden="true">
          {/* Top Scalloped Valance / Pelmet */}
          <div className="curtain-valance">
            <svg viewBox="0 0 500 90" preserveAspectRatio="none" className="valance-svg">
              <defs>
                <linearGradient id="valanceGrad" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="#7a1a32" />
                  <stop offset="50%" stopColor="#b23253" />
                  <stop offset="100%" stopColor="#5c1023" />
                </linearGradient>
                <linearGradient id="goldFringe" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#e5b382" />
                  <stop offset="50%" stopColor="#ffe6b8" />
                  <stop offset="100%" stopColor="#e5b382" />
                </linearGradient>
              </defs>
              <path
                d="M 0 0 H 500 V 35 Q 437.5 75 375 35 Q 312.5 75 250 35 Q 187.5 75 125 35 Q 62.5 75 0 35 Z"
                fill="url(#valanceGrad)"
              />
              <path
                d="M 0 35 Q 62.5 75 125 35 Q 187.5 75 250 35 Q 312.5 75 375 35 Q 437.5 75 500 35"
                stroke="url(#goldFringe)"
                strokeWidth="3.5"
                fill="none"
              />
            </svg>
          </div>

          {/* Left Velvet Curtain */}
          <div className="curtain curtain-left">
            <div className="curtain-folds" />
            <div className="curtain-tieback left">
              <span className="tassel" />
            </div>
          </div>

          {/* Right Velvet Curtain */}
          <div className="curtain curtain-right">
            <div className="curtain-folds" />
            <div className="curtain-tieback right">
              <span className="tassel" />
            </div>
          </div>
        </div>

        {/* Layer 4: Stage Floral Garlands & Side Lanterns */}
        <div className="layer layer-stage-decor" aria-hidden="true">
          {/* Left Floral Arch / Pillar */}
          <div className="floral-pillar pillar-left">
            <StageBlossomCluster />
          </div>

          {/* Right Floral Arch / Pillar */}
          <div className="floral-pillar pillar-right">
            <StageBlossomCluster mirrored />
          </div>

          {/* Traditional Fanoos / Lanterns on side */}
          <div className="stage-lantern lantern-left">
            <div className="fanoos-glow" />
            <FanoosIcon />
          </div>
          <div className="stage-lantern lantern-right">
            <div className="fanoos-glow" />
            <FanoosIcon />
          </div>
        </div>

        {/* Layer 5: Hero Content & Couple Typography */}
        <div className="layer layer-content">
          <div className="hero-wedding-card">
            <p className="hero-bismillah-mini">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>

            <div className="hero-invite-lead">
              <span className="ornament-leaf">❦</span>
              <span>Together with their families</span>
              <span className="ornament-leaf">❧</span>
            </div>

            {/* Groom Name */}
            <div className="hero-name-block groom-block">
              <span className="name-role-badge">THE GROOM</span>
              <h2 className="hero-name groom-name">{weddingData.groom.name}</h2>
            </div>

            {/* Wedding & Symbol */}
            <div className="hero-connector">
              <span className="connector-flourish" />
              <div className="hero-ampersand">&amp;</div>
              <span className="connector-flourish" />
            </div>

            {/* Bride Name */}
            <div className="hero-name-block bride-block">
              <span className="name-role-badge">THE BRIDE</span>
              <h1 className="hero-name bride-name">{weddingData.bride.name}</h1>
            </div>

            {/* Wedding Symbol: Golden Rings with Sparkle */}
            <div className="hero-wedding-symbol" aria-label="Interlocking Wedding Rings">
              <svg viewBox="0 0 100 50" fill="none" className="wedding-rings-svg">
                <defs>
                  <linearGradient id="ringGold1" x1="0" y1="0" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffe6b8" />
                    <stop offset="40%" stopColor="#df9f62" />
                    <stop offset="100%" stopColor="#fff3db" />
                  </linearGradient>
                  <linearGradient id="ringGold2" x1="0" y1="0" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff0d0" />
                    <stop offset="50%" stopColor="#c57b3d" />
                    <stop offset="100%" stopColor="#fad79a" />
                  </linearGradient>
                </defs>
                {/* Left Ring */}
                <ellipse cx="38" cy="25" rx="19" ry="17" stroke="url(#ringGold1)" strokeWidth="3" />
                {/* Right Ring */}
                <ellipse cx="62" cy="25" rx="19" ry="17" stroke="url(#ringGold2)" strokeWidth="3" />
                {/* Diamond Sparkle atop left ring */}
                <path d="M38 5 L41 8 L38 11 L35 8 Z" fill="#ffffff" />
                <circle cx="38" cy="8" r="1.5" fill="#fff" />
              </svg>
            </div>

            <div className="hero-union-badge">
              <span className="union-diamond">✦</span>
              <span className="union-text">TWO SOULS · ONE DESTINY</span>
              <span className="union-diamond">✦</span>
            </div>
          </div>
        </div>

        {/* Layer 6: Foreground Stage Flowers Bed */}
        <div className="layer layer-foreground-flowers" aria-hidden="true">
          <div className="stage-flower-bed">
            <svg viewBox="0 0 600 120" preserveAspectRatio="none" className="flower-bed-svg">
              {/* Soft Leaves Background */}
              <g fill="#5f7754" opacity="0.6">
                <path d="M30 110 Q50 60 70 95 Q90 50 110 90 Q140 40 170 85 Q210 30 250 80 Q290 40 330 85 Q370 30 410 80 Q450 45 490 85 Q530 50 570 100 Z" />
              </g>
              {/* Pink & Cream Rose Blossoms */}
              <circle cx="60" cy="85" r="22" fill="#e89cb2" opacity="0.9" />
              <circle cx="60" cy="85" r="14" fill="#f8d1dc" />
              <circle cx="60" cy="85" r="7" fill="#b03a58" />

              <circle cx="120" cy="95" r="26" fill="#f5c2cf" opacity="0.85" />
              <circle cx="120" cy="95" r="17" fill="#fdf0f4" />
              <circle cx="120" cy="95" r="8" fill="#c95071" />

              <circle cx="190" cy="80" r="28" fill="#df7896" opacity="0.9" />
              <circle cx="190" cy="80" r="18" fill="#fbe4ec" />
              <circle cx="190" cy="80" r="9" fill="#9b2545" />

              <circle cx="260" cy="92" r="24" fill="#eed2bb" opacity="0.9" />
              <circle cx="260" cy="92" r="15" fill="#fff4e8" />
              <circle cx="260" cy="92" r="7" fill="#c78652" />

              <circle cx="340" cy="90" r="25" fill="#f0adc0" opacity="0.9" />
              <circle cx="340" cy="90" r="16" fill="#fdedf2" />
              <circle cx="340" cy="90" r="8" fill="#a83151" />

              <circle cx="410" cy="82" r="27" fill="#e487a2" opacity="0.9" />
              <circle cx="410" cy="82" r="17" fill="#fde5ed" />
              <circle cx="410" cy="82" r="8" fill="#8f203d" />

              <circle cx="480" cy="95" r="24" fill="#ebd0ba" opacity="0.85" />
              <circle cx="480" cy="95" r="15" fill="#fff7f0" />
              <circle cx="480" cy="95" r="7" fill="#b47441" />

              <circle cx="540" cy="85" r="22" fill="#ea9db2" opacity="0.9" />
              <circle cx="540" cy="85" r="14" fill="#fae0e7" />
              <circle cx="540" cy="85" r="7" fill="#9d2847" />
            </svg>
          </div>
        </div>

        {/* Layer 7: Animated Scroll Down Indicator */}
        <div className="layer layer-scroll-prompt">
          <a href="#bride-section" className="scroll-prompt-btn" aria-label="Scroll to Invitation Details">
            <span className="scroll-text">SCROLL TO CELEBRATE</span>
            <div className="scroll-mouse-icon">
              <span className="scroll-wheel" />
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="scroll-chevron">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function StageBlossomCluster({ mirrored = false }) {
  return (
    <svg
      viewBox="0 0 100 320"
      fill="none"
      className={`blossom-cluster-svg ${mirrored ? 'cluster-mirrored' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Golden Branch */}
      <path d="M50 320 Q20 200 45 100 Q60 40 40 10" stroke="#d5a065" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M45 100 Q80 80 85 50" stroke="#d5a065" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35 180 Q10 160 15 130" stroke="#d5a065" strokeWidth="1.5" strokeLinecap="round" />

      {/* Cascading Floral Heads */}
      <circle cx="40" cy="18" r="12" fill="#fad2dc" stroke="#c45c7b" strokeWidth="1" />
      <circle cx="40" cy="18" r="6" fill="#e27393" />

      <circle cx="85" cy="50" r="14" fill="#eed5be" stroke="#be8650" strokeWidth="1" />
      <circle cx="85" cy="50" r="7" fill="#dd9f64" />

      <circle cx="45" cy="98" r="18" fill="#f8b6c8" stroke="#a73859" strokeWidth="1.2" />
      <circle cx="45" cy="98" r="9" fill="#c9496f" />

      <circle cx="16" cy="132" r="13" fill="#fbe2ea" stroke="#d1728e" strokeWidth="1" />
      <circle cx="16" cy="132" r="6" fill="#e48aa3" />

      <circle cx="36" cy="180" r="19" fill="#f5a4ba" stroke="#9d2b4c" strokeWidth="1.2" />
      <circle cx="36" cy="180" r="9" fill="#bc3f64" />

      <circle cx="50" cy="260" r="22" fill="#eed2bc" stroke="#ad723b" strokeWidth="1.2" />
      <circle cx="50" cy="260" r="10" fill="#cc8b50" />
    </svg>
  )
}

function FanoosIcon() {
  return (
    <svg viewBox="0 0 60 100" fill="none" className="fanoos-svg">
      <path d="M30 5 V20" stroke="#d49454" strokeWidth="2" />
      <circle cx="30" cy="5" r="3" fill="#d49454" />
      {/* Lantern Cap */}
      <path d="M15 25 Q30 18 45 25 L48 35 H12 Z" fill="#d49454" stroke="#a8692c" strokeWidth="1" />
      {/* Glass Body */}
      <path d="M12 35 L18 80 H42 L48 35 Z" fill="rgba(255, 235, 195, 0.35)" stroke="#d49454" strokeWidth="1.5" />
      {/* Flame Inside */}
      <ellipse cx="30" cy="58" rx="4" ry="9" fill="#ffeaa7" className="fanoos-candle" />
      <circle cx="30" cy="58" r="2" fill="#ffffff" />
      {/* Lantern Base */}
      <path d="M16 80 L14 92 H46 L44 80 Z" fill="#d49454" stroke="#a8692c" strokeWidth="1" />
    </svg>
  )
}
