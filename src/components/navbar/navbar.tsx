'use client'
import React, { useState, useEffect } from 'react'
import styles from '../sidenav/style.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '../sidenav/nav/nav'
import Link from 'next/link'
import Content from './navContent'
import Links from './navLinks'
import { Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'

export const background: Variants = {
  initial: { height: 0 },
  open: {
    height: '100%',
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  closed: {
    height: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
}

const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState(false) // Menu state
  const [scrolledPast, setScrolledPast] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100 // Adjust based on navbar height
      setScrolledPast(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsActive((prev) => !prev)
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {/* Main Navbar */}
      <div
        className={`z-[99] ${styles.header} transition-colors duration-300 ease-in-out px-8 pt-4 absolute top-0
        ${isHome ? 'text-white' : 'text-black'}`}
      >
        <div className={`styles.bar `}>
          <div className={`grid grid-cols-12 gap-x-8 `}>
            <div
              className={`col-start-1 md:col-end-6 sm:col-end-11 flex items-center space-x-12 *:mt-0 *:mb-auto ${
                isActive ? 'hidden' : ''
              }`}
            >
              <div className={`${isHome ? 'text-white' : '*:text-black!important'}`}>
                <Content>
                  {isHome ? (
                    <p
                      className={`${isHome ? 'text-white' : 'text-black'} sm:block hidden  text-2xl max-w-[650px] leading-relaxed`}
                    >
                      JIAHAUS is a media company that offers brands, businesses, and people to bring
                      projects to life through art, design, and technology.
                    </p>
                  ) : null}
                </Content>
              </div>
            </div>

            <div className="col-start-7 col-end-11">
              <Links scrolledPast={scrolledPast} isActive={isActive} toggleMenu={toggleMenu} />
            </div>

            <div
              className={`col-start-12 col-end-13 *:right-0 flex flex-row-reverse fixed right-8
    transition-colors duration-300
    ${scrolledPast && !isActive ? 'bg-[#0c0c0cd3] rounded-sm' : ''}
    ${scrolledPast && isActive ? 'bg-transparent' : ''}
  `}
            >
              <div className={`h-full top-4 right-4 z-[100]`}>
                <button
                  className="flex flex-col space-y-1.5 cursor-pointer p-2 rounded "
                  onClick={toggleMenu}
                >
                  <motion.span
                    className={`block w-6 h-0.5 transition-transform ${
                      isActive ? 'rotate-45 translate-y-2.5 bg-black' : 'bg-white'
                    }`}
                  ></motion.span>
                  <motion.span
                    className={`block w-6 h-0.5 ${isActive ? 'opacity-0 bg-black' : 'bg-white'}`}
                  ></motion.span>
                  <motion.span
                    className={`block w-6 h-0.5 transition-transform ${
                      isActive ? '-rotate-45 -translate-y-1.5 bg-black' : 'bg-white'
                    }`}
                  ></motion.span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Animated Background */}
      <div
        className={`z-[90] col-start-6 col-end-10 ${
          styles.header
        } transition-colors duration-300 ease-in-out ${
          isActive ? 'bg-[#f4f0ea] bgTest fixed' : 'bg-transparent text-white fixed'
        }`}
      >
        {' '}
        <motion.div
          variants={background}
          initial="initial"
          animate={isActive ? 'open' : 'closed'}
          exit="exit"
          className={styles.background}
        />
        {/* Side Navigation */}
        <>
          {isActive ? (
            <motion.div
              key="nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Nav />
            </motion.div>
          ) : null}
        </>
      </div>
    </>
  )
}

export default Navbar
