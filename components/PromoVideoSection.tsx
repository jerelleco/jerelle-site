'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import MagneticButton from './MagneticButton'

export default function PromoVideoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!isPlaying || !iframeRef.current) return

    // Load Vimeo Player API
    const script = document.createElement('script')
    script.src = 'https://player.vimeo.com/api/player.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      if (!iframeRef.current) return
      
      // @ts-ignore - Vimeo Player API
      const player = new window.Vimeo.Player(iframeRef.current)
      
      // Listen for timeupdate to detect near-end (more responsive than 'ended' event)
      player.on('timeupdate', (data: any) => {
        // Get duration and current time
        player.getDuration().then((duration: number) => {
          // Trigger black screen 0.5 seconds before video actually ends
          // This prevents Vimeo recommendations from showing
          if (data.seconds >= duration - 0.5) {
            setVideoEnded(true)
          }
        })
      })

      // Backup: also listen for ended event in case timeupdate misses it
      player.on('ended', () => {
        setVideoEnded(true)
      })
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [isPlaying])

  const handleReplay = () => {
    setVideoEnded(false)
    if (iframeRef.current) {
      // @ts-ignore
      const player = new window.Vimeo.Player(iframeRef.current)
      player.setCurrentTime(0)
      player.play()
    }
  }

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.15 } : {}}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#12deba] rounded-full blur-[200px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              See what we actually do.
              <br />
              <span className="text-[#12deba]">In 55 seconds.</span>
            </h2>

            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
              No stock footage. No templated garbage. Just real work for real businesses who needed to stop blending in.
            </p>

            {/* Scarcity callout */}
            <div className="bg-gradient-to-r from-[#12deba]/10 to-transparent border-l-4 border-[#12deba] pl-6 py-4 mb-8">
              <p className="text-white font-bold text-lg mb-1">
                Only taking on 3 new clients this month.
              </p>
              <p className="text-white/60">
                Not a fake countdown. Not a marketing trick. Just capacity.
              </p>
            </div>

            {/* CTA button - NOW MAGNETIC */}
            <MagneticButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold rounded-full hover:shadow-2xl hover:shadow-[#12deba]/50 transition-all text-lg group"
            >
              Book Your Discovery Call
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </motion.div>

          {/* Right Column - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            {/* Phone Frame */}
            <div className="relative">
              {/* Phone outer shell */}
              <div className="relative bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-[3rem] p-2 shadow-2xl shadow-black/50">
                {/* Phone inner bezel */}
                <div className="relative bg-black rounded-[2.5rem] overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20 border-b border-zinc-800" />

                  {/* Video container - Vertical 9:16 */}
                  <div className="relative w-[280px] sm:w-[320px] aspect-[9/16] bg-black">
                    {!isPlaying ? (
                      /* Poster/Play Button State */
                      <motion.button
                        onClick={() => setIsPlaying(true)}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/60 via-black/40 to-black/60 group"
                      >
                        {/* Play button */}
                        <div className="relative mb-4">
                          {/* Pulsing ring */}
                          <motion.div
                            animate={{
                              scale: [1, 1.4, 1],
                              opacity: [0.5, 0, 0.5],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-[#12deba] rounded-full"
                          />
                          {/* Button */}
                          <div className="relative w-20 h-20 bg-[#12deba] rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg shadow-[#12deba]/50">
                            <svg
                              className="w-8 h-8 text-black ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>

                        {/* Play text */}
                        <span className="text-white font-bold text-sm">Tap to play</span>
                        <span className="text-white/60 text-xs mt-1">55 seconds</span>
                      </motion.button>
                    ) : (
                      <>
                        {/* Vimeo Embed */}
                        <iframe
                          ref={iframeRef}
                          src="https://player.vimeo.com/video/1154878162?h=941547baf1&autoplay=1&loop=0&title=0&byline=0&portrait=0&controls=1"
                          className="absolute inset-0 w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                          allowFullScreen
                        />

                        {/* End Screen Overlay - Black to Logo */}
                        {videoEnded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-black flex flex-col items-center justify-center z-30"
                          >
                            {/* Jerelle.co Logo Fade In */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2, duration: 0.6 }}
                              className="text-center"
                            >
                              <h3 className="text-4xl font-bold text-white mb-2">
                                Jerelle<span className="text-[#12deba]">.co</span>
                              </h3>
                              <p className="text-white/60 text-sm mb-6">
                                Commercial Video & Photography
                              </p>

                              {/* Replay Button - ALSO MAGNETIC */}
                              <MagneticButton
                                onClick={handleReplay}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold rounded-full hover:shadow-lg hover:shadow-[#12deba]/50 transition-all text-sm"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                                Watch Again
                              </MagneticButton>
                            </motion.div>
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Reflection/glow under phone */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-[#12deba]/20 blur-2xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
