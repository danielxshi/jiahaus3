'use client'
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react'
import Project from '../components/project/projectText'
import { motion } from 'framer-motion'
import gsap from 'gsap'
// import Image from 'next/image';
import Rounded from '../components/common/RoundedButton/index'

interface ProjectType {
  title: string
  src: string
  color: string
}

const projects: ProjectType[] = [
  {
    title: 'C2 Montreal',
    src: 'c2montreal.png',
    color: '#000000',
  },
  {
    title: 'Office Studio',
    src: 'officestudio.png',
    color: '#8C8C8C',
  },
  {
    title: 'Locomotive',
    src: 'locomotive.png',
    color: '#EFE8D3',
  },
  {
    title: 'Silencio',
    src: 'silencio.png',
    color: '#706D63',
  },
]

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: 'easeInOut' as const },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: 'easeInOut' as const },
  },
}

interface ModalState {
  active: boolean
  index: number
}

export default function Home({ projects }: { projects: ProjectType[] }) {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 })
  const { active, index } = modal

  // Define refs with proper types
  const modalContainer = useRef<HTMLDivElement | null>(null)
  const cursor = useRef<HTMLDivElement | null>(null)
  const cursorLabel = useRef<HTMLDivElement | null>(null)

  // Update these refs to store QuickToFunc instead of TweenValue
  const xMoveContainer = useRef<gsap.QuickToFunc | null>(null)
  const yMoveContainer = useRef<gsap.QuickToFunc | null>(null)
  const xMoveCursor = useRef<gsap.QuickToFunc | null>(null)
  const yMoveCursor = useRef<gsap.QuickToFunc | null>(null)
  const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null)
  const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    // Initialize gsap animations
    if (modalContainer.current && cursor.current && cursorLabel.current) {
      xMoveContainer.current = gsap.quickTo(modalContainer.current, 'left', {
        duration: 0.8,
        ease: 'power3',
      })
      yMoveContainer.current = gsap.quickTo(modalContainer.current, 'top', {
        duration: 0.8,
        ease: 'power3',
      })

      xMoveCursor.current = gsap.quickTo(cursor.current, 'left', {
        duration: 0.5,
        ease: 'power3',
      })
      yMoveCursor.current = gsap.quickTo(cursor.current, 'top', {
        duration: 0.5,
        ease: 'power3',
      })

      xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'left', {
        duration: 0.45,
        ease: 'power3',
      })
      yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'top', {
        duration: 0.45,
        ease: 'power3',
      })
    }
  }, [])

  const moveItems = (x: number, y: number) => {
    if (
      xMoveContainer.current &&
      yMoveContainer.current &&
      xMoveCursor.current &&
      yMoveCursor.current &&
      xMoveCursorLabel.current &&
      yMoveCursorLabel.current
    ) {
      xMoveContainer.current(x)
      yMoveContainer.current(y)
      xMoveCursor.current(x)
      yMoveCursor.current(y)
      xMoveCursorLabel.current(x)
      yMoveCursorLabel.current(y)
    }
  }

  const manageModal = (active: boolean, index: number, x: number, y: number) => {
    moveItems(x, y)
    setModal({ active, index })
  }

  return (
    <main onMouseMove={(e) => moveItems(e.clientX, e.clientY)} className={styles.projects}>
      <div className={styles.body}>
        {projects.map((project, index) => {
          return (
            <Project key={index} index={index} title={project.title} manageModal={manageModal} />
          )
        })}
      </div>
      <Rounded>
        <p>More work</p>
      </Rounded>

      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? 'enter' : 'closed'}
          className={styles.modalContainer}
        >
          <div style={{ top: `${index * -100}%` }} className={styles.modalSlider}>
            {projects.map((project, index) => {
              const { src, color } = project
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  <img src={`/images/${src}`} width={300} height={0} alt="image" />
                </div>
              )
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? 'enter' : 'closed'}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? 'enter' : 'closed'}
        >
          View
        </motion.div>
      </>
    </main>
  )
}
