'use client'

import styles from './style.module.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { height, translate } from '../anim'
import Body from './Body/body'
import Footer from './Footer/footer'
import Image from './Image/image'
import Content from '../../navbar/navContent'
import { usePathname } from 'next/navigation'

type Link = {
  title: string
  href: string
  src: string
}

const links: Link[] = [
  {
    title: 'Home',
    href: '/',
    src: 'home.png',
  },
  // {
  //   title: 'Shop',
  //   href: '/shop',
  //   src: 'shop.png',
  // },
  {
    title: 'About Us',
    href: '/about',
    src: 'home.png',
  },
  // {
  //   title: 'Lookbook',
  //   href: '/lookbook',
  //   src: 'lookbook.png',
  // },
  // {
  //   title: 'Contact',
  //   href: '/contact',
  //   src: 'contact.png',
  // },
]

type SelectedLink = {
  isActive: boolean
  index: number
}

const Index: React.FC = () => {
  const [selectedLink, setSelectedLink] = useState<SelectedLink>({
    isActive: false,
    index: 0,
  })
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}
    >
      <div className={`${styles.wrapper}`}>
        <div className={styles.container}>
          <motion.div
            // variants={translate}
            initial="initial"
            animate="enter"
            exit="exit"
            className={`flex w-full flex-col h-fit`}
          >
            <div className={`flex px-4 pt-4 justify-between items-center w-full `}>
              {/* Logo and Description */}
              <div className={`flex items-center space-x-12 *:mt-0 *:mb-auto ml-4 z-[1000]`}>
                <Content>
                  <p
                    className={`${isHome ? '' : 'text-black'} text-2xl max-w-[650px] leading-relaxed`}
                  >
                    JIAHAUS is a media company that offers brands, businesses, and people to bring
                    projects to life through art, design, and technology.
                  </p>
                </Content>
              </div>

              {/* Navigation Links */}
            </div>
          </motion.div>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
          <Footer />
        </div>
        <Image src={links[selectedLink.index].src} isActive={selectedLink.isActive} />
      </div>
    </motion.div>
  )
}

export default Index
