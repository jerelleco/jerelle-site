'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ProcessSimple() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '1',
      title: 'Book Your Call',
      description: 'Pick a time that works. 30 minutes, virtual, no prep needed on your end.',
    },
    {
      number: '2',
      title: 'We Talk',
      description: "Tell me what you're working on. I'll be honest about whether I can help.",
    },
    {
      number: '3',
      title: 'Get Your Proposal',
      description: "If it's a fit, you'll have a custom proposal in your inbox within 48 hours.",
    },
  ]

  return (
    <section ref={ref} className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Here's What Happens Next
          </h2>
        </motion.div>

        {/* Steps - No connector lines */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative"
            >
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-[#12deba]/30 transition-colors h-full">
                {/* Number circle */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#12deba] to-[#0ea088] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#12deba]/30">
                  <span className="font-accent text-3xl font-bold text-black">{step.number}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reassurance text - varied from ContactDark */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-white/50 text-lg"
        >
          Straightforward conversation. Zero obligation. If it's not a fit, no hard feelings.
        </motion.p>
      </div>
    </section>
  )
}