'use client'


import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import type { ProcessStep } from '@/lib/content'


interface ProcessGalleryImage {
  src: string
}


interface ProcessSectionProps {
  steps: ProcessStep[]
  galleryImages: ProcessGalleryImage[]
}


export default function ProcessSection({ steps, galleryImages }: ProcessSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showHeader, setShowHeader] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [swipeOffset, setSwipeOffset] = useState(0)


  useEffect(() => {
    const container = containerRef.current
    if (!container) return


    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const start = -rect.top
      const end = rect.height - window.innerHeight
      const progress = Math.max(0, Math.min(1, start / end))
      
      setScrollProgress(progress)
      
      const sectionHasReachedTop = rect.top <= 100
      const stillInSection = rect.bottom > window.innerHeight
      
      setShowHeader(sectionHasReachedTop && stillInSection)
    }


    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  // Touch event handlers for mobile swipe
  useEffect(() => {
    const content = contentRef.current
    if (!content) return


    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      })
    }


    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart) return


      const deltaX = e.touches[0].clientX - touchStart.x
      const deltaY = e.touches[0].clientY - touchStart.y


      // Only handle horizontal swipes (when horizontal movement is greater than vertical)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault() // Prevent vertical scroll during horizontal swipe
        
        // Calculate swipe offset (negative deltaX because swiping left should move content right)
        const maxOffset = (steps.length - 1) * 0.2 // Max 0.2 steps per swipe
        const offset = Math.max(-maxOffset, Math.min(maxOffset, -deltaX / 300))
        setSwipeOffset(offset)
      }
    }


    const handleTouchEnd = () => {
      if (swipeOffset !== 0 && containerRef.current) {
        // Convert swipe offset to scroll position change
        const rect = containerRef.current.getBoundingClientRect()
        const scrollPerStep = (rect.height - window.innerHeight) / steps.length
        const scrollChange = swipeOffset * scrollPerStep
        
        // Smoothly scroll to new position
        window.scrollBy({
          top: scrollChange,
          behavior: 'smooth'
        })
      }
      
      setTouchStart(null)
      setSwipeOffset(0)
    }


    content.addEventListener('touchstart', handleTouchStart, { passive: true })
    content.addEventListener('touchmove', handleTouchMove, { passive: false })
    content.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      content.removeEventListener('touchstart', handleTouchStart)
      content.removeEventListener('touchmove', handleTouchMove)
      content.removeEventListener('touchend', handleTouchEnd)
    }
  }, [touchStart, swipeOffset, steps.length])


  // Smooth continuous position with swipe offset
  const rawPosition = (scrollProgress * steps.length) + swipeOffset
  const nearestSlide = Math.round(rawPosition)
  const activeSlide = Math.min(steps.length - 1, Math.max(0, nearestSlide))
  
  const lerpFactor = 0.5
  const smoothPosition = Math.max(0, Math.min(steps.length - 1, (rawPosition * lerpFactor) + (nearestSlide * (1 - lerpFactor))))


  const repeatedImages = [...galleryImages, ...galleryImages, ...galleryImages]


  const timelineProgress = Math.min(100, (smoothPosition / (steps.length - 1)) * 100)


  return (
    <section 
      ref={containerRef}
      id="process" 
      className="relative bg-black"
      style={{ height: `${(steps.length + 0.5) * 60}vh` }}
    >
      {/* Section Header */}
      <div className="fixed top-20 left-0 right-0 z-30 pointer-events-none">
        <div className="container mx-auto px-6">
          <motion.div
            animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="font-accent text-3xl md:text-5xl text-accent mb-2">
              How we work together
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Our Process
            </h2>
          </motion.div>
        </div>
      </div>


      <div 
        ref={contentRef}
        className="sticky top-0 h-screen overflow-hidden flex flex-col touch-pan-y"
      >
        <div className="flex-1 overflow-hidden relative">
          <div 
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{
              background: `radial-gradient(ellipse at ${20 + (smoothPosition / (steps.length - 1) * 60)}% 50%, rgba(18, 222, 186, 0.1) 0%, transparent 60%)`
            }}
          />
          
          <div 
            className="flex h-full transition-transform duration-300 ease-out relative z-10"
            style={{ 
              transform: `translateX(-${smoothPosition * 100}vw)`,
              width: `${steps.length * 100}vw`
            }}
          >
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex-shrink-0 w-screen h-full flex items-center justify-center relative"
              >
                <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10 pb-40 md:pb-64 pt-32 md:pt-48">
                  {/* Number circle and title */}
                  <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#12deba] to-[#0ea088] rounded-full shadow-2xl shadow-[#12deba]/30">
                        <span className="font-accent text-2xl md:text-4xl font-bold text-black leading-none">{step.number}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>


                  <p className="text-base md:text-xl text-white/70 mb-6 md:mb-8 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>


                  <ul className="space-y-2 md:space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12deba] flex-shrink-0 mt-2" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* HORIZONTAL TIMELINE */}
        <div className="absolute left-0 right-0 px-4 md:px-12 z-20 bottom-[170px] md:bottom-[220px]">
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />
            
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-[#12deba] -translate-y-1/2 transition-all duration-300 ease-out"
              style={{ width: `${timelineProgress}%` }}
            />
            
            <div className="relative flex justify-between">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-7 h-7 md:w-10 md:h-10 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                      i <= activeSlide 
                        ? 'bg-[#12deba] border-[#12deba] shadow-lg shadow-[#12deba]/50' 
                        : 'bg-black border-white/20'
                    }`}
                  >
                    <span className={`font-accent text-xs md:text-base transition-colors duration-500 leading-none ${
                      i <= activeSlide ? 'text-black' : 'text-white/40'
                    }`}>
                      {step.number}
                    </span>
                  </div>
                  <span className={`text-[9px] md:text-xs mt-1.5 md:mt-2 font-mono transition-colors duration-500 whitespace-nowrap ${
                    i <= activeSlide ? 'text-[#12deba]' : 'text-white/40'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Scrolling Gallery at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-44 md:h-60 bg-gradient-to-t from-black/80 to-transparent overflow-hidden">
          <div 
            className="flex h-full items-center gap-3 md:gap-4 transition-transform duration-300 ease-out px-3 md:px-4"
            style={{
              transform: `translateX(-${smoothPosition * 12.5}%)`,
              width: 'max-content'
            }}
          >
            {repeatedImages.map((image, index) => (
              <div
                key={index}
                className="relative h-32 md:h-48 flex-shrink-0 rounded-lg overflow-hidden border border-white/10"
              >
                <img
                  src={image.src}
                  alt={`Event photography ${index + 1}`}
                  className="h-32 md:h-48 w-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Mobile Swipe Hint - Shows briefly on first load */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="md:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
      >
        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#12deba]/30">
          <p className="text-xs text-[#12deba] flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Swipe to navigate
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
