import { useEffect, useState } from 'react'
import { weddingData } from '../data/weddingData'
import './Countdown.css'

export default function Countdown() {
  const targetDateStr = weddingData.wedding.targetISO

  const calculateTimeLeft = () => {
    const fixedTarget = new Date('2026-12-23T19:30:00+05:30').getTime()
    const now = Date.now()

    // If system date is before Sept 18 2026, count down to that moment.
    // If already past that date, target next anniversary so countdown is always live & ticking!
    let targetTime = fixedTarget
    if (now >= fixedTarget) {
      const targetYear = new Date(now).getFullYear() + 1
      targetTime = new Date(`${targetYear}-12-23T19:30:00+05:30`).getTime()
    }

    const difference = Math.max(0, targetTime - now)

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNum = (n) => String(n).padStart(2, '0')

  return (
    <section className="invitation-section countdown-section" aria-label="Wedding Countdown">
      <div className="wedding-card countdown-card">
        {/* Header Badge */}
        <div className="countdown-header-pill">
          <span className="cd-star">✦</span>
          <span className="cd-badge-title">COUNTING DOWN TO FOREVER</span>
          <span className="cd-star">✦</span>
        </div>

        <h2 className="countdown-event-title">Until The Auspicious Moment</h2>

        {/* Four Countdown Boxes Live */}
        <div className="countdown-grid">
          <CountdownBox value={formatNum(timeLeft.days)} label="DAYS" />
          <CountdownBox value={formatNum(timeLeft.hours)} label="HOURS" />
          <CountdownBox value={formatNum(timeLeft.minutes)} label="MINUTES" />
          <CountdownBox value={formatNum(timeLeft.seconds)} label="SECS" isSeconds />
        </div>

        <p className="countdown-date-footer">
          <span className="footer-diamond">❖</span>
          <span>Wednesday, 23rd December 2026</span>
          <span className="footer-diamond">❖</span>
        </p>
      </div>
    </section>
  )
}

function CountdownBox({ value, label, isSeconds = false }) {
  return (
    <div className={`countdown-box-item ${isSeconds ? 'is-seconds' : ''}`}>
      <div className="box-frame">
        <span className="box-number">{value}</span>
      </div>
      <span className="box-label">{label}</span>
    </div>
  )
}
