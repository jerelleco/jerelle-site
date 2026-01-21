'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import CalendlyButton from '@/components/CalendlyButton'
import MagneticButton from '@/components/MagneticButton'

export default function TheProblem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 px-6 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
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
                Here's what we see all the time
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
              >
                You're either putting nothing out there, or you hate what you're currently posting.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
              >
                Meanwhile, your competitors are everywhere. And it feels like they're winning.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-white/60 leading-relaxed"
              >
                You know you need content. Good content. The kind that makes people stop, pay attention, and actually take action.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="bg-white/5 border-l-4 border-[#12deba] pl-6 py-4"
              >
                <p className="text-xl text-white font-bold leading-relaxed">
                  But here's the thing most people get wrong.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-white/60 leading-relaxed"
              >
                They think they need a photographer. Someone to show up, take pretty pictures, hand over a Dropbox link, and disappear.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-xl text-white font-bold leading-relaxed"
              >
                What they actually need is a <span className="text-[#12deba]">story</span>. One that connects. One that sells.
              </motion.p>
            </div>
          </div>

          {/* Right Column - Image + Noise Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/Images/BTSContentCreation.jpg"
                alt="Behind the scenes content creation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white/50 text-sm uppercase tracking-wider mb-3">What passes for "marketing"</p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-center gap-2">
                  <span className="text-red-400/60">-</span>
                  Flashy B-roll
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400/60">-</span>
                  Slow-motion shots of nothing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400/60">-</span>
                  Trendy transitions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400/60">-</span>
                  3 seconds of attention, then forgotten
                </li>
              </ul>
              <p className="text-white font-bold mt-4">
                That's not marketing. That's noise.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl md:text-3xl text-white font-bold leading-relaxed mb-8">
            Noise doesn't build businesses.{' '}
            <span className="text-[#12deba]">Stories do.</span>
          </p>
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
    </section>
  )
}
