'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import CalendlyButton from '@/components/CalendlyButton'
import MagneticButton from '@/components/MagneticButton'

export default function CtaBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f1210] to-[#0a0a0a]" />

      {/* Glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#12deba]/8 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[#12deba] font-bold uppercase tracking-wider text-sm mb-6">
            The Truth
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Every Day You Wait, Someone Else
            <br />
            <span className="text-[#12deba]">Becomes Their First Choice</span>
          </h2>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
            Right now, your ideal customers are scrolling. They're searching. They're deciding who to trust with their money.
          </p>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
            And the businesses that show up? The ones with real videos, real faces, real stories. Those are the ones getting the calls. The ones building relationships before a customer ever walks through the door.
          </p>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
            The question isn't whether video works. <span className="text-white font-bold">It's whether you'll be the one they remember when they scroll past.</span>
          </p>

          <div className="max-w-xl mx-auto mb-10 p-6 md:p-8 bg-white/5 border-l-4 border-[#12deba] rounded-lg">
            <p className="text-2xl md:text-3xl text-white font-bold mb-6">Six months from now, you could have:</p>
            <ul className="space-y-4 text-lg md:text-xl text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-[#12deba]">•</span>
                <span>A library of content working for you around the clock</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#12deba]">•</span>
                <span>Customers who feel like they already know you</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#12deba]">•</span>
                <span>A brand that's impossible to ignore</span>
              </li>
            </ul>
            <p className="text-base md:text-lg text-white/50 mt-6 italic">Or you could be in the exact same spot, watching competitors pull ahead.</p>
          </div>

          <p className="text-xl md:text-2xl text-white font-bold mb-2">
            30 minutes. One conversation.
          </p>
          <p className="text-white/60 mb-10">
            Let's figure out if we're the right fit to make this happen for you.
          </p>

          <MagneticButton asWrapper>
            <CalendlyButton
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold rounded-full hover:shadow-2xl hover:shadow-[#12deba]/50 transition-all text-lg group"
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
            </CalendlyButton>
          </MagneticButton>

          <p className="text-white/40 text-sm mt-8">
            Free · No obligation · Just an honest conversation
          </p>
        </motion.div>
      </div>
    </section>
  )
}
