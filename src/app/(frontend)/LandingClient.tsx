'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Projects from '../../components/projects'
import Loading from '../../components/loading'

import ProjectGrid from '../../components/project/projectGrid'
import Footer from '../../components/footer/footer'
import SectionLabel from '../../components/SectionLabel'

import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from '../style.module.scss'
import type { Variants } from 'framer-motion'

const scaleAnimation: Variants = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
  },
}

interface Props {
  modal?: any
  projects?: any
}

export default function App({ modal = { active: false, index: 0 }, projects = [] }: Props) {
  const { active, index } = modal
  const modalContainer = useRef(null)
  const cursor = useRef(null)
  const cursorLabel = useRef(null)

  useEffect(() => {
    //Move Container
    let xMoveContainer = gsap.quickTo(modalContainer.current, 'left', {
      duration: 0.8,
      ease: 'power3',
    })
    let yMoveContainer = gsap.quickTo(modalContainer.current, 'top', {
      duration: 0.8,
      ease: 'power3',
    })
    //Move cursor
    let xMoveCursor = gsap.quickTo(cursor.current, 'left', {
      duration: 0.5,
      ease: 'power3',
    })
    let yMoveCursor = gsap.quickTo(cursor.current, 'top', {
      duration: 0.5,
      ease: 'power3',
    })
    //Move cursor label
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'left', {
      duration: 0.45,
      ease: 'power3',
    })
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'top', {
      duration: 0.45,
      ease: 'power3',
    })

    window.addEventListener('mousemove', (e) => {
      const { pageX, pageY } = e
      xMoveContainer(pageX)
      yMoveContainer(pageY)
      xMoveCursor(pageX)
      yMoveCursor(pageY)
      xMoveCursorLabel(pageX)
      yMoveCursorLabel(pageY)
    })
  }, [])

  const testRef = useRef<HTMLDivElement>(null)
  const [bgImage, setBgImage] = useState<string>(
    "url('https://64.media.tumblr.com/a37dbe3f92e2c7475aec88204df46315/a309d07a6d80ec8b-1f/s640x960/e3aac204b98a9e31ad02cb115670ab83ad20cfb5.gif')",
  )
  const [activeIndex, setActiveIndex] = useState<number>(0) // Track the active image index
  const [isContainerHovered, setIsContainerHovered] = useState<boolean>(false) // Track container hover state
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false) // Track mouse state
  const imagesRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLDivElement>(null)
  // const headerRef = useRef<HTMLDivElement>(null); // Reference for the header
  const bgControl = useRef<HTMLDivElement>(null) // Reference for bgControl
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  interface SectionProps {
    children: ReactNode
    id?: string // Optional in case `id` is not always provided
  }

  const MaskedText: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const [animationPlayed, setAnimationPlayed] = useState(false) // Track if animation has already played

    const lines = [
      'We partner with clients in financial',
      ' services, electronic, travel and tourism',
      ' services, electronic, travel and tourism',
      ' services, electronic, travel and tourism',
    ]

    useEffect(() => {
      const handleScroll = () => {
        const element = document.getElementById('masked-text')
        if (element) {
          const position = element.getBoundingClientRect().top
          const windowHeight = window.innerHeight

          if (position < windowHeight * 0.35) {
            setVisible(true)
          } else if (position < 1) {
            setVisible(false)
            setAnimationPlayed(false) // Reset animationPlayed when out of view
          }
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
      if (visible && !animationPlayed) {
        const timeline = gsap.timeline({
          defaults: { duration: 0.5, ease: 'power2.out' },
        })

        timeline.set('.masked-line', {
          y: 50,
          clipPath: 'inset(100% 0 0 0)', // Hidden from bottom
        })

        timeline
          .to('.masked-line', {
            y: 0,
            clipPath: 'inset(0% 0 0 0)', // Revealed from bottom to top
            stagger: 0.1, // Stagger delay for each line
          })
          .then(() => {
            setAnimationPlayed(true) // Mark animation as complete
          })
      }
    }, [visible, animationPlayed])

    return (
      <>
        <Loading />

        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? 'enter' : 'closed'}
          className={[[styles.modalContainer], 'rounded-md'].join(' ')}
        >
          <div style={{ top: index * -100 + '%' }} className={styles.modalSlider}>
            {projects.map((project: { src: any; color: any }, index: any) => {
              const { src, color } = project
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  {/* <Image
                    src={`/images/${src}`}
                    width={300}
                    height={0}
                    alt="image"
                  /> */}
                </div>
              )
            })}
          </div>
        </motion.div>
      </>
    )
  }

  const Section: React.FC<SectionProps> = ({ children, id }) => (
    <section className="my-[4em]" id={id}>
      {children}
    </section>
  )

  interface BigTextProps {
    children: ReactNode
  }

  const BigText: React.FC<BigTextProps> = ({ children }) => (
    <h1 className="font-serif text-big tracking-big-text">{children}</h1>
  )

  const items = [
    {
      id: 0,
      defaultText: '',
      hoverText: 'Hovered 1',
      skill: 'Web Developemnt',
    },
    { id: 1, defaultText: '', hoverText: 'Hovered 2', skill: 'Design' },
    { id: 2, defaultText: '', hoverText: 'Hovered 3', skill: 'Branding' },
  ]

  const images = [
    {
      src: 'https://www.datocms-assets.com/138794/1729718757-dothings_hero_pers.jpg?auto=format&fit=max&h=2440&lossless=true&q=90&w=2440',
      title: 'Dynamic Hero Image',
    },
    {
      src: 'https://i.makeagif.com/media/8-06-2022/s6jXoT.gif',
      title: 'Funny Animation',
    },
    {
      src: 'https://i.redd.it/uq02spvbvi681.gif',
      title: 'Creative Visual',
    },
  ]

  useEffect(() => {
    if (
      !imagesRef.current ||
      !backdropRef.current ||
      !bgImageRef.current ||
      !bgControl.current ||
      !testRef.current
    )
      return

    // Set the first image of testRef as the background image
    const testImages = testRef.current.querySelectorAll('.image')
    if (testImages.length > 0) {
      const firstImageSrc = testImages[0].getAttribute('src')
      if (firstImageSrc) {
        setBgImage(`url(${firstImageSrc})`) // Set as initial background
      }
    }

    const images = imagesRef.current.querySelectorAll('.image')
    const backdrop = backdropRef.current

    //   // Slide-in animation for images
    gsap.fromTo(
      images,
      { y: 1000, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'expo.out',
      },
    )

    // Swipe-up masking transition for backdrop and scale for background image
    gsap
      .timeline({ delay: 1.2 })
      .to(images, { y: -100, stagger: 0.2, duration: 0.5, ease: 'ease.in' }, 0)
      .fromTo(
        backdrop,
        { clipPath: 'inset(0% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.2,
          ease: 'circ.out',
        },
        0,
      )
      .fromTo(
        bgControl.current,
        { clipPath: 'inset(100% 100% 0% 0%)' }, // Initially hidden
        {
          clipPath: 'inset(0% 0% 0% 0%)', // Reveal fully
          duration: 1.2,
          ease: 'circ.out',
        },
      )
      .fromTo(
        testRef.current,
        {
          y: '100%', // Start below the viewport
          clipPath: 'inset(0% 0% 100% 0%)', // Fully masked
          // delay: .5,
        },
        {
          y: '0%', // Move into position
          clipPath: 'inset(0% 0% 0% 0%)', // Reveal fully
          duration: 0.7,
          ease: 'expo.out',
        },
      )
      .fromTo(bgImageRef.current, { scale: 1.2 }, { scale: 1, duration: 1.2, ease: 'expo.out' }, 0)
      // Trigger the header animation after a delay
      // .add(() => animateHeader(), 0.7)
      .to('.element-to-hide', {
        duration: 0.5,
        onComplete: () => {
          setIsAnimationComplete(true) // Set the flag when animation completes
        },
      })
  }, [setIsAnimationComplete])

  useEffect(() => {
    console.log('aninm' + isAnimationComplete)
    if (!testRef.current || !imagesRef.current) return

    const testImages = testRef.current.querySelectorAll<HTMLImageElement>('.image')

    // Adjust positions of images based on hover state and active index
    testImages.forEach((image, index) => {
      gsap.to(image, {
        y: isContainerHovered || index === activeIndex ? 0 : '100%', // Above or below fold
        opacity: isContainerHovered || index === activeIndex ? 1 : 0, // Show active image
        duration: 0.4,
        ease: 'power2.out',
      })
    })
  }, [isContainerHovered, activeIndex])

  const handleMouseEnterImage = (index: number, imageUrl: string) => {
    setBgImage(`url(${imageUrl})`) // Update the background image
    setHoveredIndex(index)
    setActiveIndex(index)
  }

  const handleMouseEnterContainer = () => {
    setIsContainerHovered(true) // All images stay above the fold
  }

  const handleMouseLeaveContainer = () => {
    setIsContainerHovered(false) // Reset to activeIndex after leaving
  }

  const handleMouseLeaveImage = (index: number) => {
    setActiveIndex(index) // Keep the last hovered image as active
  }

  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('masked-text')
      if (element) {
        const position = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        // Trigger reveal when 80% of the element is visible
        if (position < windowHeight - 500) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      {/* <Loading /> */}
      <div className="landing-container relative overflow-hidden col-span-12 min-h-screen">
        {/* Backdrop with dynamic background image */}
        <div
          ref={bgImageRef}
          className="backdrop absolute top-0 left-0 h-full w-full z-40 bg-cover bg-center"
          style={{
            backgroundImage: bgImage, // Apply the dynamic background image
          }}
        ></div>

        <div
          ref={bgControl}
          className="absolute top-0 left-0 h-full w-full bg-black z-30" // Ensuring it's visible and positioned correctly
        ></div>

        <div className="backdrop absolute bottom-0 left-0 flex pb-4 w-screen z-50 h-fit">
          <div className="grid grid-cols-12 px-4 w-full">
            <div className="col-start-1 col-end-5 row-start-1 flex *:mb-0 *:mt-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIndex(item.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex text-white text-base font-semibold rounded-md cursor-pointer transition duration-300"
                >
                  {activeIndex === item.id ? (
                    <div className="flex flex-col h-fit ">
                      <span>0{activeIndex + 1}</span>
                      <span>{item.hoverText}</span>
                      <span>{item.skill}</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div
              className="col-start-4 col-end-9 row-start-1"
              onMouseEnter={handleMouseEnterContainer}
              onMouseLeave={handleMouseLeaveContainer}
            >
              <div ref={testRef} className="image-wrapper flex flex-row space-x-4">
                {[
                  'https://www.datocms-assets.com/138794/1729718757-dothings_hero_pers.jpg?auto=format&fit=max&h=2440&lossless=true&q=90&w=2440',
                  'https://i.makeagif.com/media/8-06-2022/s6jXoT.gif',
                  'https://i.redd.it/uq02spvbvi681.gif',
                ].map((src, index) => (
                  <img
                    key={index}
                    className="image w-32 aspect-video rounded-md cursor-pointer shadow-md"
                    src={src}
                    alt={`Image ${index + 1}`}
                    onMouseEnter={() => handleMouseEnterImage(index, src)}
                    onMouseLeave={() => handleMouseLeaveImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop */}
        <div
          ref={backdropRef}
          className="backdrop absolute top-0 left-0 h-screen items-center bg-white flex *:my-auto *:mx-auto w-screen z-50"
        >
          <div ref={imagesRef} className="image-wrapper flex flex-row space-x-4 ">
            <img
              className="image w-32 aspect-video mx-auto rounded-md"
              src="https://www.datocms-assets.com/138794/1729718757-dothings_hero_pers.jpg?auto=format&fit=max&h=2440&lossless=true&q=90&w=2440"
              alt="Image 1"
            />
            <img
              className="image w-32 aspect-video mx-auto rounded-md"
              src="https://media3.giphy.com/media/iggT536JzcWrfoAfxi/200.gif"
              alt="Image 2"
            />
            <img
              className="image w-32 aspect-video mx-auto rounded-md"
              src="https://media3.giphy.com/media/iggT536JzcWrfoAfxi/200.gif"
              alt="Image 3"
            />
          </div>
        </div>
      </div>

      <div
        className={`h-full flex flex-col w-screen element-to-hide  ${
          isAnimationComplete ? 'visible' : 'hidden'
        }`}
      >
        <div className="px-4 h-full col-start-1 col-end-13 pt-[20vh]">
          <ProjectGrid />
        </div>
      </div>
    </>
  )
}
