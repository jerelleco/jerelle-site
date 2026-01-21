'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import CalendlyButton from '@/components/CalendlyButton'
import MagneticButton from '@/components/MagneticButton'

export default function DiscoveryHero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasEnded, setHasEnded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handlePlay = () => {
    setIsPlaying(true)
    // Post message to Vimeo to play
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage('{"method":"play"}', '*')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#12deba] rounded-full blur-[200px]"
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Make Your Brand Feel Familiar
              <br />
              <span className="text-[#12deba] font-accent text-3xl md:text-4xl lg:text-5xl">
                Before Customers Walk Through the Door
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
              Strategic video content that builds trust and drives real results for Southern Alberta businesses.
            </p>

            {/* Urgency callout */}
            <div className="bg-gradient-to-r from-[#12deba]/10 to-transparent border-l-4 border-[#12deba] pl-6 py-4 mb-8">
              <p className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                <span>🎯</span> Only Taking On 3 New Clients This Month
              </p>
              <p className="text-white/60">
                Not a fake countdown. Not a marketing trick. Just capacity.
              </p>
            </div>

            {/* CTA Button */}
            <MagneticButton asWrapper>
              <CalendlyButton
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold rounded-full hover:shadow-2xl hover:shadow-[#12deba]/50 transition-all text-lg group"
              >
                Book Your Free Discovery Call
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </CalendlyButton>
            </MagneticButton>
          </motion.div>

          {/* Right Column - Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative mx-auto" style={{ maxWidth: '300px' }}>
              {/* Phone Frame */}
              <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl shadow-black/50">
                <div className="relative bg-black rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: '9/16' }}>
                  {/* Video */}
                  <iframe
                    ref={iframeRef}
                    src="https://player.vimeo.com/video/1154878162?badge=0&autopause=0&player_id=0&app_id=58479&background=0"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    title="Promo Video"
                  />

                  {/* Play overlay */}
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer z-10"
                      onClick={handlePlay}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 bg-gradient-to-r from-[#12deba] to-[#0ea088] rounded-full flex items-center justify-center shadow-2xl shadow-[#12deba]/50"
                      >
                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                      <p className="absolute bottom-8 text-white/60 text-sm">55 seconds</p>
                    </motion.div>
                  )}

                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20" />
                </div>
              </div>

              {/* Reflection */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-[#12deba]/20 blur-2xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}