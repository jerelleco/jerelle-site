'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import CalendlyButton from '@/components/CalendlyButton'
import MagneticButton from '@/components/MagneticButton'

export default function SolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    'Ads that convert viewers into customers',
    'Brand content that tells your story',
    'Event coverage that captures real moments',
    'Social content that keeps you top-of-mind',
  ]

  return (
    <section ref={ref} className="relative py-24 px-6">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#12deba]/10 rounded-full blur-[150px] translate-x-1/2" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Video With Strategy
              <br />
              <span className="text-[#12deba]">Behind It</span>
            </h2>

            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              With 10+ years of marketing experience across local shops and multi-million dollar enterprises, I don't just make videos. I create content that actually moves people to action.
            </p>

            <div className="space-y-4 mb-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  {/* Teal checkmark */}
                  <div className="w-6 h-6 rounded-full bg-[#12deba]/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-[#12deba]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white/80 text-lg">{service}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <MagneticButton asWrapper>
                <CalendlyButton
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold rounded-full hover:shadow-xl hover:shadow-[#12deba]/30 transition-all"
                >
                  See How This Works For You
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </CalendlyButton>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <img
                src="/Images/BTSBeausBiriaCommercialVideo2.jpg"
                alt="Behind the scenes video production"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <p className="text-[#12deba] font-accent text-2xl">10+ Years</p>
                  <p className="text-white/60 text-sm">Marketing Experience</p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#12deba]/30 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}