'use client'
import React, { useEffect, useRef, useState, ReactNode } from 'react'
import gsap from 'gsap'
import { motion, Variants } from 'framer-motion'
import Loading from '../../components/loading'
import ProjectGrid from '../../components/project/projectGrid'
import styles from '../style.module.scss'
import Footer from '../../components/footer/footer'

const scaleAnimation: Variants = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
}

interface Props {
  modal?: { active: boolean; index: number }
  projects?: { src: string; color: string }[]
  movies: {
    id: string
    slug: string
    name?: string
    overview?: string
    poster?: { url: string }
  }[]
}

export default function App({ modal = { active: false, index: 0 }, projects = [], movies }: Props) {
  const { active, index } = modal

  const modalContainer = useRef(null)
  const cursor = useRef(null)
  const cursorLabel = useRef(null)

  const testRef = useRef<HTMLDivElement>(null)
  const [bgImage, setBgImage] = useState<string>(
    "url('https://64.media.tumblr.com/a37dbe3f92e2c7475aec88204df46315/a309d07a6d80ec8b-1f/s640x960/e3aac204b98a9e31ad02cb115670ab83ad20cfb5.gif')",
  )
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isContainerHovered, setIsContainerHovered] = useState<boolean>(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  const imagesRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLDivElement>(null)
  const bgControl = useRef<HTMLDivElement>(null)

  const items = [
    { id: 0, hoverText: 'Media', skill: 'Event' },
    { id: 1, hoverText: 'Media', skill: 'Automotive' },
    { id: 2, hoverText: 'Media', skill: 'Real Estate' },
  ]

  const images = [
    {
      src: 'https://i.imgur.com/Q7aza9I.jpeg',
      title: 'Dynamic Hero Image',
    },
    {
      src: 'https://i.imgur.com/LKuJ5mz.jpeg',
      title: 'Funny Animation',
    },
    {
      src: 'https://i.imgur.com/puPmbFu.jpeg',
      title: 'Creative Visual',
    },
  ]

  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, 'left', {
      duration: 0.8,
      ease: 'power3',
    })
    const yMoveContainer = gsap.quickTo(modalContainer.current, 'top', {
      duration: 0.8,
      ease: 'power3',
    })
    const xMoveCursor = gsap.quickTo(cursor.current, 'left', {
      duration: 0.5,
      ease: 'power3',
    })
    const yMoveCursor = gsap.quickTo(cursor.current, 'top', {
      duration: 0.5,
      ease: 'power3',
    })
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'left', {
      duration: 0.45,
      ease: 'power3',
    })
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'top', {
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

  useEffect(() => {
    if (
      !testRef.current ||
      !imagesRef.current ||
      !bgImageRef.current ||
      !bgControl.current ||
      !backdropRef.current
    )
      return

    const testImages = testRef.current.querySelectorAll('.image')
    if (testImages.length > 0) {
      const firstImageSrc = testImages[0].getAttribute('src')
      if (firstImageSrc) {
        setBgImage(`url(${firstImageSrc})`)
      }
    }

    const images = imagesRef.current.querySelectorAll('.image')
    const backdrop = backdropRef.current

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

    gsap
      .timeline({ delay: 1.2 })
      .to(images, { y: -100, stagger: 0.2, duration: 0.5, ease: 'ease.in' }, 0)
      .fromTo(
        backdrop,
        { clipPath: 'inset(0% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'circ.out' },
        0,
      )
      .fromTo(
        bgControl.current,
        { clipPath: 'inset(100% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'circ.out' },
      )
      .fromTo(
        testRef.current,
        { y: '100%', clipPath: 'inset(0% 0% 100% 0%)' },
        { y: '0%', clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.out' },
      )
      .fromTo(bgImageRef.current, { scale: 1.2 }, { scale: 1, duration: 1.2, ease: 'expo.out' }, 0)
      .to('.element-to-hide', {
        duration: 0.5,
        onComplete: () => setIsAnimationComplete(true),
      })
  }, [])

  useEffect(() => {
    if (!testRef.current || !imagesRef.current) return

    const testImages = testRef.current.querySelectorAll<HTMLImageElement>('.image')
    testImages.forEach((image, index) => {
      gsap.to(image, {
        y: isContainerHovered || index === activeIndex ? 0 : '100%',
        opacity: isContainerHovered || index === activeIndex ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    })
  }, [isContainerHovered, activeIndex])

  const handleMouseEnterImage = (index: number, imageUrl: string) => {
    setBgImage(`url(${imageUrl})`)
    setHoveredIndex(index)
    setActiveIndex(index)
  }
  const gridProjects = movies.map((movie) => ({
    id: movie.id,
    slug: movie.slug, // ✅ add this
    title: movie.name || 'Untitled',
    subtitle: movie.overview || 'No description available',
    image: movie.poster ? { url: movie.poster.url } : undefined,
  }))

  return (
    <>
      <div className="landing-container relative overflow-hidden col-span-12 min-h-screen">
        <motion.div
          ref={bgImageRef}
          className="backdrop absolute top-0 left-0 h-full w-full z-40 bg-cover bg-center"
          style={{ backgroundImage: bgImage }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />
        <div ref={bgControl} className="absolute top-0 left-0 h-full w-full bg-black z-30" />
        <div className="backdrop absolute bottom-0 left-0 flex pb-4 w-screen z-50 h-fit">
          <div className="grid grid-cols-12 px-8 w-full">
            <div className="col-start-1 col-end-5 row-start-1 flex *:mb-0 *:mt-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIndex(item.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex text-white text-base font-semibold rounded-md cursor-pointer transition duration-300"
                >
                  {activeIndex === item.id && (
                    <div className="flex flex-col h-fit">
                      <span>0{activeIndex + 1}</span>
                      <span>{item.hoverText}</span>
                      <span>{item.skill}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              className="col-start-7 col-end-12 row-start-1"
              onMouseEnter={() => setIsContainerHovered(true)}
              onMouseLeave={() => setIsContainerHovered(false)}
            >
              <div ref={testRef} className="image-wrapper flex flex-row space-x-4">
                {images.map((img, index) => (
                  <img
                    key={index}
                    className="image w-32 h-16 rounded-md cursor-pointer shadow-md object-cover"
                    src={img.src}
                    alt={img.title}
                    onMouseEnter={() => handleMouseEnterImage(index, img.src)}
                    onMouseLeave={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={backdropRef}
          className="backdrop absolute top-0 left-0 h-screen items-center bg-white flex *:my-auto *:mx-auto w-screen z-50"
        >
          <div ref={imagesRef} className="image-wrapper flex flex-row space-x-4">
            {images.map((img, i) => (
              <img
                key={i}
                className="image w-32 object-cover aspect-video mx-auto rounded-md"
                src={img.src}
                alt={`Backdrop ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col element-to-hide max-w-screen px-8 overflow-x-hidden ${isAnimationComplete ? 'visible' : 'hidden'}`}
      >
        <div className="col-start-1 col-end-13 pt-[20vh] mb-[20vh]">
          <ProjectGrid projects={gridProjects} />
        </div>
        <Footer />
      </div>
    </>
  )
}
