'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animate, setAnimate] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)
  let animationDelayTimeout: NodeJS.Timeout | null = null

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (animationDelayTimeout) clearTimeout(animationDelayTimeout)
          setIsVisible(true)
          animationDelayTimeout = setTimeout(() => {
            setAnimate(true)
          }, 800) // Add a delay to smooth the animation
        } else if (!entry.isIntersecting) {
          if (animationDelayTimeout) clearTimeout(animationDelayTimeout)
          setIsVisible(false)
          animationDelayTimeout = setTimeout(() => {
            setAnimate(false)
          }, 800) // Add a delay to smooth the animation
        }
      },
      {
        rootMargin: '0px 0px 150px 0px', // 300px above the viewport bottom triggers the callback
        threshold: 0.5, // Adjust to ensure 50% visibility is still required
      },
    )

    if (textRef.current) observer.observe(textRef.current)

    return () => {
      if (textRef.current) observer.unobserve(textRef.current)
      if (animationDelayTimeout) clearTimeout(animationDelayTimeout)
    }
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.bottomBar}>
        <h1 ref={textRef} className={`${styles.scrollText} ${animate ? styles.visible : ''}`}>
          &copy; {new Date().getFullYear()}
        </h1>
      </div>
    </footer>
  )
}

export default Footer
