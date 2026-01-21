'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function ClientTestimonial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#12deba]/8 rounded-full blur-[150px]" />
      </div>

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
              What Clients Say
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10"
        >
          {/* Quote mark */}
          <div className="text-[#12deba]/30 text-6xl font-serif leading-none mb-4">"</div>

          <p className="text-xl text-white leading-relaxed mb-6">
            One home builder we worked with <span className="text-[#12deba] font-bold">tripled his business in a year</span>. He told me personally that the content we produced was a major driver of that growth.
          </p>

          <p className="text-lg text-white/60 leading-relaxed mb-6">
            Not because it looked good.
          </p>

          <p className="text-xl text-white font-bold leading-relaxed">
            Because it told a story his customers connected with.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/60">
              That's the difference between content that looks professional and content that <span className="text-[#12deba]">builds businesses</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
