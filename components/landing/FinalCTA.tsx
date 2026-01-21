'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
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
          className="mb-12"
        >
          {/* Centered moustache for final CTA */}
          <div className="flex justify-center mb-8">
            <Image
              src="/big-moustache-12deba.png"
              alt=""
              width={60}
              height={30}
              className="opacity-60"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Ready to Stop Getting Ignored?
          </h2>

          <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-4 text-center">
            Let's talk about what you're actually trying to achieve.
          </p>

          <p className="text-white/60 leading-relaxed max-w-2xl mx-auto mb-6 text-center">
            Not what shots you want. Not what your Pinterest board looks like. What business result you need. What story will get you there. And how we're going to tell it.
          </p>

          <p className="text-white/40 text-sm text-center">
            No fluff. No corporate BS. Just real conversation.
          </p>
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
