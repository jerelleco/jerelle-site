'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import CalendlyInline from '@/components/CalendlyInline'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Track when booking section is viewed
  useEffect(() => {
    if (isInView && typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Booking Section Viewed'
      })
    }
  }, [isInView])

  return (
    <section
      ref={ref}
      id="booking-section"
      className="relative py-24 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-black"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#12deba]/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Stand Out?
          </h2>

          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-[#12deba]/10 border border-[#12deba]/30 rounded-full px-6 py-3 mb-8">
            <span className="text-xl">🎯</span>
            <span className="text-[#12deba] font-bold">Only 3 spots available this month</span>
          </div>
        </motion.div>

        {/* Calendly Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-8"
        >
          <CalendlyInline />
        </motion.div>
      </div>
    </section>
  )
}