'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import CalendlyButton from '@/components/CalendlyButton'
import MagneticButton from '@/components/MagneticButton'

export default function WhoThisIsFor() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const perfectFit = [
    "You're done sitting on the sidelines while competitors get all the attention",
    "You're ready to invest in content that actually moves the needle",
    "You want more sales, stronger customer loyalty, or better talent acquisition",
    "You understand that good marketing is an investment, not an expense"
  ]

  const notFit = [
    "You just want someone to execute a shot list",
    "You're looking for the cheapest option",
    "You don't actually care about results",
    "You think marketing is just \"posting pretty pictures\""
  ]

  return (
    <section ref={ref} className="relative py-24 px-6 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]">
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/big-moustache-12deba.png"
              alt=""
              width={40}
              height={20}
              className="opacity-80"
            />
            <p className="text-white font-bold uppercase tracking-wider text-base">
              Who Is This For
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Perfect Fit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-[#12deba] font-bold text-lg mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              You're a perfect fit if:
            </h3>
            <ul className="space-y-4 pl-9">
              {perfectFit.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="text-white/80 text-base leading-relaxed"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Not a Fit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white/50 font-bold text-lg mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Probably not a fit if:
            </h3>
            <ul className="space-y-4 pl-9">
              {notFit.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="text-white/50 text-base leading-relaxed"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="text-white/30 text-sm mt-6 pl-9 italic"
            >
              No hard feelings—we're just not the right fit for everyone.
            </motion.p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center pt-8"
        >
          <MagneticButton asWrapper>
            <CalendlyButton
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#E55555] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-[#FF6B6B]/40 transition-all group"
            >
              Let's See If We're a Fit
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
