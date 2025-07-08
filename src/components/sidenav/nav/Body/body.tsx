import { motion } from 'framer-motion'
// import Link from 'next/link';
import styles from './style.module.scss'
import { blur, translate } from '../../anim'

type LinkType = {
  title: string
  href: string
  src: string
}

type SelectedLink = {
  isActive: boolean
  index: number
}

type BodyProps = {
  links: LinkType[]
  selectedLink: SelectedLink
  setSelectedLink: React.Dispatch<React.SetStateAction<SelectedLink>>
}

const Body: React.FC<BodyProps> = ({ links, selectedLink, setSelectedLink }) => {
  const getChars = (word: string) => {
    return word.split('').map((char, i) => (
      <motion.span
        custom={[i * 0.02, (word.length - i) * 0.01]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
        key={char + i}
        style={{ lineHeight: 1.5 }}
      >
        {char}
      </motion.span>
    ))
  }

  return (
    <div className={`px-8 ${styles.body} `}>
      {links.map((link, index) => {
        const { title, href } = link
        return (
          <a key={`l_${index}`} href={href}>
            <motion.p
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={selectedLink.isActive && selectedLink.index !== index ? 'open' : 'closed'}
            >
              {getChars(title)}
            </motion.p>
          </a>
        )
      })}
    </div>
  )
}

export default Body
