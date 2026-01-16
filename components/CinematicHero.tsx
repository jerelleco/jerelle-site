'use client'


import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import PathSelector from './PathSelector'
import MagneticButton from './MagneticButton'


interface CinematicHeroProps {
  onPathSelect: (path: 'customers' | 'brand' | 'event' | 'content' | 'explore') => void
}


export default function CinematicHero({ onPathSelect }: CinematicHeroProps) {
  const [showPaths, setShowPaths] = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<string>('')


  const handlePathSelect = (path: 'customers' | 'brand' | 'event' | 'content' | 'explore') => {
    const goalLabels = {
      customers: 'Get More Customers',
      brand: 'Build Your Brand',
      event: 'Cover an Event',
      content: 'Regular Content',
      explore: 'Just Exploring'
    }


    setSelectedGoal(goalLabels[path])
    setCelebrating(true)


    setTimeout(() => {
      setCelebrating(false)
      setShowPaths(false)
      onPathSelect(path)


      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      }, 300)
    }, 1500)
  }


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#12deba] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#12deba] rounded-full blur-[120px]"
        />
      </div>


      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          {celebrating ? (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="text-6xl mb-4"
              >
                🎯
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-[#12deba]"
              >
                {selectedGoal}
              </motion.h2>


              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-white/40 mt-6"
              >
                Personalizing your experience...
              </motion.p>


              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1
                  }}
                  animate={{
                    x: Math.cos(i * 30 * Math.PI / 180) * 200,
                    y: Math.sin(i * 30 * Math.PI / 180) * 200,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut"
                  }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#12deba] rounded-full"
                />
              ))}
            </motion.div>
          ) : !showPaths ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              >
                Your Brand Has a Story Worth Telling.
                <br />
                <span className="text-[#12deba] font-accent">We make sure it gets told right.</span>
              </motion.h1>


              {/* Subheadline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-8 text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto"
              >
                <p>Commercials. Brand films. Social content.</p>
                <p>Professional video and photo production for businesses ready to show up bigger.</p>
              </motion.div>


              {/* CTA - Now with MagneticButton */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <MagneticButton
                  onClick={() => setShowPaths(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold rounded-full hover:shadow-2xl hover:shadow-[#12deba]/50 transition-shadow text-lg"
                >
                  What brings you here today?
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MagneticButton>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="paths"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                What's on your mind?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white/60 mb-12 text-lg"
              >
                Pick the one that fits. I'll show you what's worked for businesses like yours.
              </motion.p>


              <PathSelector onPathSelect={handlePathSelect} />


              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowPaths(false)}
                className="mt-8 text-white/40 hover:text-white/60 transition-colors text-sm"
              >
                ← Back
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
