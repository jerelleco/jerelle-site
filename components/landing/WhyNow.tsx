'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import CalendlyButton from '@/components/CalendlyButton'
import MagneticButton from '@/components/MagneticButton'

export default function WhyNow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 px-6 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      <div className="container mx-auto max-w-4xl relative z-10">
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
              Why This Matters Now
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-3xl text-white font-bold leading-relaxed"
          >
            Your competitors aren't slowing down.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xl text-white/70 leading-relaxed"
          >
            Every day you wait is another day they're out there telling their story while you're silent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 border-l-4 border-[#12deba] pl-6 py-6"
          >
            <p className="text-lg text-white/80 leading-relaxed">
              The businesses that win aren't always the ones with the best product.
            </p>
            <p className="text-xl text-white font-bold mt-4">
              They're the ones that tell the best story.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg text-white/70 leading-relaxed"
          >
            The ones that make people feel something. Trust something. Choose something.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4"
          >
            <p className="text-2xl text-[#12deba] font-bold mb-2">
              That could be you.
            </p>
            <p className="text-xl text-white/60">
              But you have to start.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-8"
          >
            <MagneticButton asWrapper>
              <CalendlyButton
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#E55555] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-[#FF6B6B]/40 transition-all text-lg group"
              >
                Let's Start The Conversation
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
    </section>
  )
}
