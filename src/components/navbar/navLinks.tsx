import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { blur } from '../../components/sidenav/anim' // Import the blur effect
import styles from '../sidenav/style.module.scss'

interface NavigationLinksProps {
  isActive: boolean
  scrolledPast: boolean
  toggleMenu: () => void
}

interface LinkType {
  title: string
  href: string
}

interface SelectedLink {
  isActive: boolean
  index: number | null // Allow null for no selection
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  isActive,
  scrolledPast,
  toggleMenu,
}) => {
  const links: LinkType[] = [
    { title: 'Work', href: '/' },
    { title: 'About', href: '/about' },
    // { title: 'Contact', href: '/contact' },
  ]

  const [selectedLink, setSelectedLink] = useState<SelectedLink>({
    isActive: false,
    index: null, // Default to null for no active index
  })

  return (
    <div className="hidden md:flex transition-colors duration-300 ease-in-out space-x-12">
      <div
        className={`${
          isActive ? 'opacity-0' : 'opacity-100'
        } flex flex-row space-x-2 group *:left-0 *:text-left text-base *:leading-relaxed `}
      >
        {links.map((link, index) => (
          <div key={`link-${index}`}>
            {' '}
            {/* ← moved key here */}
            <motion.a
              href={link.href}
              onMouseEnter={() =>
                setSelectedLink((prev) => (prev.index !== index ? { isActive: true, index } : prev))
              }
              onMouseLeave={() =>
                setSelectedLink((prev) =>
                  prev.index === index ? { isActive: false, index: null } : prev,
                )
              }
              variants={blur}
              initial={false}
              animate={selectedLink.isActive && selectedLink.index !== index ? 'open' : 'closed'}
            >
              {link.title}
            </motion.a>
            {index < links.length - 1 && (
              <motion.span
                initial={false}
                onMouseEnter={() => setSelectedLink((prev) => ({ isActive: true, index }))}
                onMouseLeave={() => setSelectedLink({ isActive: false, index: null })}
                animate={selectedLink.isActive ? 'open' : 'closed'}
                className="group"
                variants={blur}
              >
                ,
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* <div
        className={`h-full top-4 right-4 z-[100] ${
          scrolledPast ? "invisible" : "flex"
        } *:mt-0 *:mb-auto h-full ${styles.el} ${isActive ? "absolute" : ""}`}
      >
        <button
          className="flex flex-col space-y-1.5 cursor-pointer p-2 rounded "
          onClick={toggleMenu}
        >
          <motion.span
            className={`block w-6 h-0.5 transition-transform ${
              isActive ? "rotate-45 translate-y-2.5 bg-black" : "bg-white"
            }`}
          ></motion.span>
          <motion.span
            className={`block w-6 h-0.5 ${
              isActive ? "opacity-0 bg-black" : "bg-white"
            }`}
          ></motion.span>
          <motion.span
            className={`block w-6 h-0.5 transition-transform ${
              isActive ? "-rotate-45 -translate-y-1.5 bg-black" : "bg-white"
            }`}
          ></motion.span>
        </button>
      </div> */}
    </div>
  )
}

export default NavigationLinks
