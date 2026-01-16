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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showHeader, setShowHeader] = useState(false)


  useEffect(() => {
    const container = containerRef.current
    if (!container) return


    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const start = -rect.top
      const end = rect.height - window.innerHeight
      const progress = Math.max(0, Math.min(1, start / end))
      
      setScrollProgress(progress)
      
      // Show header only when section top is above viewport AND we've scrolled past the first 10% of section
      const sectionHasReachedTop = rect.top <= 100
      const stillInSection = rect.bottom > window.innerHeight
      
      setShowHeader(sectionHasReachedTop && stillInSection )
    }


    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  // Smooth continuous position with slight snap tendency
  const rawPosition = scrollProgress * steps.length
  const nearestSlide = Math.round(rawPosition)
  const activeSlide = Math.min(steps.length - 1, nearestSlide)
  
  // Lerp between continuous scroll and snapped position (70% continuous, 30% snap)
  const lerpFactor = 0.5
  const smoothPosition = (rawPosition * lerpFactor) + (nearestSlide * (1 - lerpFactor))


  const repeatedImages = [...galleryImages, ...galleryImages, ...galleryImages]


  // Calculate progress bar width based on smooth position
  const timelineProgress = Math.min(100, (smoothPosition / (steps.length - 1)) * 100)


  return (
    <section 
      ref={containerRef}
      id="process" 
      className="relative bg-black"
      style={{ height: `${(steps.length + 0.5) * 60}vh` }}
    >
      {/* Section Header - Shows only when actively in process section */}
      <div className="fixed top-20 left-0 right-0 z-30 pointer-events-none">
        <div className="container mx-auto px-6">
          <motion.div
            animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="font-accent text-4xl md:text-5xl text-accent mb-2">
              How we work together
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Our Process
            </h2>
          </motion.div>
        </div>
      </div>


      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
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
                <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10 pb-48 md:pb-64 pt-48">
                  {/* Number circle and title on same line */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#12deba] to-[#0ea088] rounded-full shadow-2xl shadow-[#12deba]/30">
                        <span className="font-accent text-4xl font-bold text-black leading-none">{step.number}</span>
                      </div>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>


                  <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>


                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-white/60">
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


        {/* HORIZONTAL TIMELINE - Responsive positioning */}
        <div className="absolute left-0 right-0 px-6 md:px-12 z-20 bottom-[180px] md:bottom-[220px]">
          <div className="relative max-w-6xl mx-auto">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />
            
            {/* Progress line - smoothly follows position */}
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-[#12deba] -translate-y-1/2 transition-all duration-300 ease-out"
              style={{ width: `${timelineProgress}%` }}
            />
            
            {/* Step dots */}
            <div className="relative flex justify-between">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                      i <= activeSlide 
                        ? 'bg-[#12deba] border-[#12deba] shadow-lg shadow-[#12deba]/50' 
                        : 'bg-black border-white/20'
                    }`}
                  >
                    <span className={`font-accent text-sm md:text-base transition-colors duration-500 leading-none ${
                      i <= activeSlide ? 'text-black' : 'text-white/40'
                    }`}>
                      {step.number}
                    </span>
                  </div>
                  <span className={`text-[10px] md:text-xs mt-2 font-mono transition-colors duration-500 ${
                    i <= activeSlide ? 'text-[#12deba]' : 'text-white/40'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Scrolling Gallery at Bottom - Reduced size on mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-48 md:h-60 bg-gradient-to-t from-black/80 to-transparent overflow-hidden">
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
                className="relative h-36 md:h-48 flex-shrink-0 rounded-lg overflow-hidden border border-white/10"
              >
                <img
                  src={image.src}
                  alt={`Event photography ${index + 1}`}
                  className="h-36 md:h-48 w-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
