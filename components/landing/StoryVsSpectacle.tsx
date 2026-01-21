'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import CalendlyButton from '@/components/CalendlyButton'
import MagneticButton from '@/components/MagneticButton'

export default function StoryVsSpectacle() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const flashyApproach = [
    "Slow-motion product shots",
    "Drone footage for no reason",
    "Trendy transitions",
    "Looks cool for 3 seconds",
    "Forgotten immediately",
    "No emotional connection"
  ]

  const storyApproach = [
    "Real people with real problems",
    "Emotional journey your audience relates to",
    "Authentic moments that build trust",
    "Holds attention the entire time",
    "Remembered and shared",
    "Creates brand loyalty"
  ]

  return (
    <section ref={ref} className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#12deba]/10 rounded-full blur-[150px] translate-x-1/2" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/big-moustache-12deba.png"
              alt=""
              width={40}
              height={20}
              className="opacity-80"
            />
            <p className="text-[#12deba] font-bold uppercase tracking-wider text-sm">
              The Real Difference
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Story vs. Spectacle
          </h2>
          <p className="text-lg text-white/70 max-w-2xl">
            Here's what separates content that gets scrolled past from content that actually builds your business:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Flashy B-roll Approach */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Flashy B-roll Approach</h3>
            </div>

            <ul className="space-y-2 mb-6">
              {flashyApproach.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="text-red-400/60 mt-0.5">-</span>
                  <span className="text-white/60">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-white/70 text-sm italic">
                Viewer thinks: <span className="text-white">"That looked nice"</span> and moves on.
              </p>
            </div>
          </motion.div>

          {/* Story-driven Approach */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#12deba]/5 border border-[#12deba]/30 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#12deba]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#12deba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Story-driven Approach</h3>
            </div>

            <ul className="space-y-2 mb-6">
              {storyApproach.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="text-[#12deba] mt-0.5">+</span>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#12deba]/10 border border-[#12deba]/30 rounded-xl p-4">
              <p className="text-white/70 text-sm italic">
                Viewer thinks: <span className="text-white">"I felt that. I need that. I trust them."</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom image + text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
            <Image
              src="/Images/CelebrateDowntownYQLEventCoverage.jpg"
              alt="Real moments from event coverage"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div>
            <p className="text-xl md:text-2xl text-white font-bold mb-4">
              The second one is what drives sales, customer loyalty, and employee acquisition.
            </p>
            <p className="text-lg text-white/60 mb-6">
              The first one just wastes your budget.
            </p>
            <MagneticButton asWrapper>
              <CalendlyButton
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#E55555] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-[#FF6B6B]/40 transition-all group"
              >
                Let's Talk Strategy
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
