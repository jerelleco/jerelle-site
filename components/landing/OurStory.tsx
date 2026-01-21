'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import CalendlyButton from '@/components/CalendlyButton'
import MagneticButton from '@/components/MagneticButton'

export default function OurStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#12deba]/10 rounded-full blur-[150px] -translate-x-1/2" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src="/Images/JeremyBTS-ParadeCoverage.jpg"
                alt="Jeremy behind the scenes"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            {/* Moustache decoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 flex items-center justify-center">
              <Image
                src="/big-moustache-12deba.png"
                alt=""
                width={80}
                height={40}
                className="opacity-30"
              />
            </div>
          </motion.div>

          {/* Right Column - Story */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <Image
                src="/big-moustache-12deba.png"
                alt=""
                width={40}
                height={20}
                className="opacity-80"
              />
              <p className="text-[#12deba] font-bold uppercase tracking-wider text-sm">
                Our Story
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-white/90 leading-relaxed"
              >
                I didn't plan to start this company.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-white/60 leading-relaxed"
              >
                I lost my position as a marketing director in a large company acquisition. Suddenly, I had nothing.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 border-l-4 border-[#12deba] pl-6 py-4"
              >
                <p className="text-lg text-white font-bold leading-relaxed">
                  So for the next 30 days, I posted a video every single day telling the story of how we were building Jerelle from scratch.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="space-y-2"
              >
                <p className="text-lg text-white/60 leading-relaxed">
                  Those 30 days brought us every client we have today.
                </p>
                <p className="text-xl text-[#12deba] font-bold leading-relaxed">
                  Within 4 months, my wife was working with me full-time.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <p className="text-lg text-white/80 leading-relaxed mb-2">
                  Why? Because <span className="text-white font-bold">storytelling with a purpose-driven agenda works</span>.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Not flashy B-roll. Not generic marketing speak. Real stories about real things.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-lg text-white font-bold leading-relaxed mb-6"
              >
                That's what we do for our clients now. We find the story. We tell it right. And we help businesses grow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <MagneticButton asWrapper>
                  <CalendlyButton
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#E55555] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-[#FF6B6B]/40 transition-all group"
                  >
                    Let's Find Your Story
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
