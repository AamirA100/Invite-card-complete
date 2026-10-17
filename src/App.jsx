import { useState, useRef, useEffect } from 'react'
import OpeningScreen from './components/OpeningScreen'
import WeddingHero from './components/WeddingHero'
import BrideSection from './components/BrideSection'
import BrideGroomDivider from './components/BrideGroomDivider'
import GroomSection from './components/GroomSection'
import IslamicQuote from './components/IslamicQuote'
import ScratchDate from './components/ScratchDate'
import Countdown from './components/Countdown'
import EventsSection from './components/EventsSection'
import RSVPSection from './components/RSVPSection'
import ComplimentsSection from './components/ComplimentsSection'
import ThankYouEnvelope from './components/ThankYouEnvelope'
import { weddingAudio } from './utils/audioPlayer'
import './App.css'

export default function App() {
  const [isOpened, setIsOpened] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const audioRef = useRef(null)

  // Initialize Audio Controller with the local audio element
  useEffect(() => {
    if (audioRef.current) {
      weddingAudio.init(audioRef.current)
    }
  }, [])

  const handleOpenInvitation = () => {
    setIsOpened(true)
    // Start music on user interaction by default
    weddingAudio.play()
    // Smoothly remove preloader from DOM after transition completes
    setTimeout(() => {
      setShowPreloader(false)
    }, 1250)
  }

  // Magic Card reveal: letters appear from blank when that particular card is in the center of the screen
  useEffect(() => {
    if (!isOpened) return

    let observer = null
    let rafId = null

    const checkCardsInCenter = () => {
      const cards = document.querySelectorAll('.wedding-card:not(.thank-you-card):not(.card-revealed)')
      if (!cards.length) return

      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        // Trigger strictly when the card has scrolled into the center zone of the screen
        // (top is at or above 60% of viewport height, and bottom is still at least 20% into view)
        if (rect.top <= windowHeight * 0.60 && rect.bottom >= windowHeight * 0.20) {
          card.classList.add('card-revealed')
          if (observer) {
            observer.unobserve(card)
          }
        }
      })
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(checkCardsInCenter)
    }

    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.wedding-card:not(.thank-you-card)')
      if (!cards.length) return

      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        cards.forEach((card) => card.classList.add('card-revealed'))
        return
      }

      // RootMargin ignores the bottom 38% and top 20%, focusing strictly on the center viewport band
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('card-revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.05,
          rootMargin: '-20% 0px -38% 0px'
        }
      )

      cards.forEach((card) => {
        if (!card.classList.contains('card-revealed')) {
          observer.observe(card)
        }
      })

      // Check cards that may already be in the center zone
      checkCardsInCenter()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
    }, 150)

    return () => {
      clearTimeout(timer)
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (observer) observer.disconnect()
    }
  }, [isOpened])

  return (
    <div className="wedding-app-root">
      {/* Audio Element pointing to audio.mp3 */}
      <audio
        ref={audioRef}
        src="/audio/audio.mp3"
        loop
        preload="auto"
      >
        <source src="/audio/audio.mp3" type="audio/mpeg" />
        <source src="/audio.mp3" type="audio/mpeg" />
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Cinematic Dark Preloader / Opening Screen */}
      {showPreloader && (
        <OpeningScreen onOpen={handleOpenInvitation} />
      )}

      {/* Floating Ambient Rose Petals (Optimized for 60fps mobile hardware compositing) */}
      <div className="ambient-petals-layer" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className={`floating-petal petal-type-${i % 3}`}
            style={{
              left: `${(i * 8.3 + 4) % 94}%`,
              animationDelay: `${(i * 1.1) % 9}s`,
              animationDuration: `${12 + (i % 5) * 1.8}s`,
              width: `${12 + (i % 7)}px`,
              height: `${14 + (i % 6)}px`,
              opacity: 0.35 + (i % 4) * 0.12,
              '--sway-x': `${((i % 2 === 0 ? 1 : -1) * (18 + (i % 22)))}px`
            }}
          />
        ))}
      </div>

      {/* Primary Mobile Container (max-width: 480px, centered on desktop) */}
      <div className="invitation-phone-container">
        {/* Animated 3D Wedding Stage Hero with Parting Curtains */}
        <WeddingHero isOpened={isOpened} />

        {/* Long Scrolling Invitation Content */}
        <main className="invitation-main-flow">
          {/* Groom Section */}
          <GroomSection />

          {/* Decorative & Floral Divider */}
          <BrideGroomDivider />

          {/* Bride Section */}
          <BrideSection />

          {/* Dedicated Islamic Wedding Quote */}
          <IslamicQuote />

          {/* Scratch-to-Discover Wedding Date */}
          <ScratchDate />

          {/* Live Dynamic Countdown Timer */}
          <Countdown />

          {/* Program Details: Nikah & Walima Ceremony Cards */}
          <EventsSection />

          {/* Interactive RSVP + Confetti */}
          {/* <RSVPSection /> */}

          {/* Best Compliments From & Near and Dear */}
          <ComplimentsSection />

          {/* Final 3D Envelope Thank You Scene & Creator Footer */}
          <ThankYouEnvelope />
        </main>
      </div>
    </div>
  )
}