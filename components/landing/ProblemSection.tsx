'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const problems
  
  
  
  
  = [
    {
      highlight: 'Be the first choice',
      text: 'when customers are ready to buy'
    },
    {
      highlight: 'Build real connections',
      text: 'with your ideal audience'
    },
    {
      highlight: 'Stay top of mind',
      text: 'so they think of you first'
    }
  ]

  return (
    <section ref={ref} className="relative py-24 px-6 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      <div className="container mx-auto max-w-5xl">
        
        {/* Goal cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <p className="text-white font-bold text-lg mb-3">
                {problem.highlight}
              </p>
              
              {/* Teal line between highlight and description */}
              <div className="w-12 h-1 bg-[#12deba] mx-auto mb-3 rounded-full" />
              
              <p className="text-white/60">
                {problem.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* The vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-block bg-gradient-to-r from-[#12deba]/10 to-transparent border-l-4 border-[#12deba] pl-6 py-4 text-left">
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Imagine customers <span className="text-white font-bold">already trusting you</span> before they reach out.
            </p>
            <p className="text-lg text-white/60 mt-2">
              Strategic video content makes that happen. <span className="text-[#12deba] font-bold">That's the goal.</span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}