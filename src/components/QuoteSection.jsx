import { useEffect, useRef } from 'react'
import { weddingData } from '../data/weddingData'
import './QuoteSection.css'

function QuoteSection() {
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
    <section className="invitation-section quote-section" ref={sectionRef}>
      <div className="section-inner">
        <div className="quote-card wedding-card">
          <div className="floral-accent top">
            <FloralElement />
            <FloralElement />
            <FloralElement />
          </div>

          <div className="arabic-quote" lang="ar" dir="rtl">
            {weddingData.islamicQuote.arabic}
          </div>

          <div className="quote-divider">
            <FloralElement className="divider-flower" />
          </div>

          <blockquote className="english-quote">
            "{weddingData.islamicQuote.translation}"
          </blockquote>

          <cite className="quote-reference">{weddingData.islamicQuote.reference}</cite>

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

function FloralElement({ className }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ width: 40, height: 40, opacity: 0.5 }}>
      <path d="M30 5 C18 5 8 15 8 27 C8 39 18 49 30 55 C42 49 52 39 52 27 C52 15 42 5 30 5 Z" 
            stroke="#d4a5b8" strokeWidth="1.5" fill="rgba(212, 165, 184, 0.1)"/>
      <ellipse cx="30" cy="25" rx="5" ry="8" fill="rgba(212, 165, 184, 0.2)"/>
    </svg>
  )
}

export default QuoteSection