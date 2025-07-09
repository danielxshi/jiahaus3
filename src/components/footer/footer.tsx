'use client'
import FooterMessages from '../../JSON/FooterItems'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Footer.module.scss'
import { motion } from 'framer-motion'

interface FooterItem {
  [key: string]: {
    link: any[] | undefined
  }
}

const Bookings: React.FC = () => {
  const [animate, setAnimate] = useState<boolean>(false)
  const textRef = useRef<HTMLDivElement | null>(null)
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const currentYear = new Date().getFullYear()

  const textParts = [
    { text: 'bookings', isSpace: false },
    { text: ' ', isSpace: true },
    { text: currentMonth, isSpace: false },
    { text: ' ', isSpace: true },
    { text: currentYear.toString(), isSpace: false },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimate(entry.isIntersecting)
      },
      {
        threshold: 0.3,
      },
    )

    if (textRef.current) observer.observe(textRef.current)
    return () => {
      if (textRef.current) observer.unobserve(textRef.current)
    }
  }, [])

  return (
    <div ref={textRef} className={styles.footer}>
      <div
        className={`leading-tight flex my-auto font-bold pl-16 ${styles.scrollText} ${
          animate ? styles.visible : ''
        }`}
      >
        <div className={styles.bottomBar}>
          <div
            className="md:w-[2em] md:h-[2em] md:max-w-[2em] md:max-h-[2em] rounded-full my-auto md:mr-2 w-[1.5em] h-[1.5em] max-w-[1.5em] max-h-[1.5em] mr-2"
            style={{ backgroundColor: '#18ecb1' }}
          ></div>

          <Link
            href="https://calendly.com/danielshi96/30min"
            className="md:ml-2 leading-tight flex my-auto text-3xl md:text-[2rem] font-bold relative transition-transform duration-300 hover:translate-x-2 hover:text-[#18ecb1] focus:outline-none focus:ring-4 focus:ring-[#18ecb1]/50"
          >
            {textParts.map((part, partIndex) =>
              part.isSpace ? (
                <span key={partIndex}>&nbsp;</span>
              ) : (
                part.text.split('').map((char, charIndex) => (
                  <div
                    key={`${partIndex}-${charIndex}`}
                    className="relative overflow-hidden inline-block"
                  >
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: animate ? 0 : '100%' }}
                      transition={{
                        duration: 0.5,
                        delay: partIndex * 0.1 + charIndex * 0.02,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                    >
                      {char}
                    </motion.div>
                  </div>
                ))
              ),
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              stroke="currentColor"
              className="absolute left-full top-1/2 transform -translate-y-1/2 opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 hover:translate-x-2"
              width="24"
              height="24"
            >
              <path
                d="M9 18l6-6-6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const renderSwitch = (params: FooterItem) => {
  const keys = Object.keys(params)
  const key = keys[0]
  const entries = params[key]?.link ?? []

  switch (key) {
    case 'contact':
      return (
        <div className="footer-contact-container mb-6 md:mb-0 footer-subobject-container">
          <h3 className="footer-subhead-wrapper">say hello</h3>
          <ul>
            {entries.map((item, index) => (
              <React.Fragment key={index}>
                <li className="underscore-cta">
                  <Link href="mailto:danielxshi@hotmail.com">email</Link>
                </li>
                <li className="underscore-cta">
                  <Link href={item.link}>{item.text}</Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      )

    case 'education':
      return (
        <div className="education-container mb-6 md:mb-0 footer-subobject-container">
          <h3 className="footer-subhead-wrapper">education</h3>
          <ul>
            {entries.map((item, index) => (
              <li className="mb-2" key={index}>
                <p className="whitespace-nowrap">{item.school}</p>
                <p className="opacity-50">{item.certification}</p>
                <p className="opacity-50 text-base">{item.reward}</p>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'experience':
      return (
        <div className="experience-container mb-6 md:mb-0 footer-subobject-container">
          <h3 className="footer-subhead-wrapper">experience</h3>
          <ul>
            {entries.map((item, index) => (
              <li className="mb-2" key={index}>
                <p className="md:whitespace-nowrap">{item.company}</p>
                <p className="md:whitespace-nowrap opacity-50">{item.position}</p>
                <p className="whitespace-nowrap opacity-50">{item.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'socials':
      return (
        <div className="social-container mb-6 md:mb-0 footer-subobject-container">
          <h3 className="footer-subhead-wrapper">links</h3>
          <ul>
            {entries.map((item, index) => (
              <li className="underscore-cta" key={index}>
                <Link href={item.url}>{item.link}</Link>
              </li>
            ))}
          </ul>
        </div>
      )

    default:
      return (
        <>
          {JSON.stringify(params)}
          <br />
          {key}
        </>
      )
  }
}

const Footer: React.FC = () => {
  return (
    <footer className="">
      {/* <div className="footer-container gap-x-8">
        {FooterMessages.FooterItems.map((item, index) => (
          <React.Fragment key={index}>{renderSwitch(item)}</React.Fragment>
        ))}
      </div> */}

      <div className="grid grid-cols-8 gap-x-8 col-start-1 col-end-9 mt-24 pb-8 px-8">
        <div className="whitespace-nowrap col-start-1 col-end-3 leading-tight my-auto hidden xl:block font-bold">
          <p className="leading-tight flex my-auto text-[2rem] font-bold transition-transform duration-300 hover:translate-x-2 hover:text-[#18ecb1] focus:outline-none focus:ring-4 focus:ring-[#18ecb1]/50">
            &nbsp;danielxshi@hotmail.com
          </p>
        </div>

        <div className="overflow-hidden col-start-1 col-end-13 xl:col-start-4 md:col-end-9 lg:flex flex-row align-middle">
          <Bookings />
        </div>
      </div>
    </footer>
  )
}

export default Footer
