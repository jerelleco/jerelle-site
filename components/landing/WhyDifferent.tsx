'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import CalendlyButton from '@/components/CalendlyButton'
import MagneticButton from '@/components/MagneticButton'

export default function WhyDifferent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const differentiators = [
    {
      title: "We Start With Your Business Goal",
      subtitle: "(Not a Shot List)",
      points: [
        "What are you trying to achieve?",
        "Who needs to take action?",
        "What's actually going to make them do it?"
      ],
      highlight: "We're not here to execute your Pinterest board. We're here to solve a business problem."
    },
    {
      title: "We Build Stories Around Real People",
      subtitle: "",
      points: [
        "Products don't sell themselves—people buy transformations",
        "We find the human story in your business",
        "Your customer's journey, your team's mission, the problem you solve"
      ],
      highlight: "People connect with people. Not features. Not specs. People."
    },
    {
      title: "We Think Like Marketers, Shoot Like Filmmakers",
      subtitle: "",
      points: [
        "We know what makes someone stop scrolling vs. keep scrolling",
        "Shots composed with psychological triggers (trust, urgency, aspiration)",
        "Content built for specific platforms and placements",
        "Multiple formats so you can use it everywhere"
      ],
      highlight: "Most producers care about looking cool. We care about what works."
    },
    {
      title: "You Get a Marketing Campaign",
      subtitle: "(Not a Photo Dump)",
      points: [
        "Photo and video assets optimized for every platform",
        "Multiple aspect ratios per concept (Stories, Feed, Ads, Website, TV)",
        "Content built for different stages of your customer journey"
      ],
      highlight: "One production. Maximum leverage."
    }
  ]

  return (
    <section ref={ref} className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#12deba]/10 rounded-full blur-[150px] -translate-x-1/2" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Header + Image */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8"
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
                  Why We're Different
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                We're Storytellers Who
                <br />
                <span className="text-[#12deba]">Understand Marketing</span>
              </h2>
              <p className="text-lg text-white/70">
                Anyone with a camera can shoot pretty footage. We find the story your customers actually care about, and tell it in a way that makes them feel something and do something.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] hidden lg:block"
            >
              <Image
                src="/Images/BTSBeausBiriaCommercialVideo.jpg"
                alt="Behind the scenes commercial production"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                  <p className="text-[#12deba] font-bold">Every frame serves the narrative.</p>
                  <p className="text-white/60 text-sm">And the narrative serves your business goal.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Accordions */}
          <div className="space-y-4">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full text-left bg-white/5 border rounded-2xl p-6 transition-all ${
                    openIndex === index
                      ? 'border-[#12deba]/50 bg-[#12deba]/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                        {item.subtitle && (
                          <span className="text-white/50 font-normal text-lg"> {item.subtitle}</span>
                        )}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-[#12deba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-white/10">
                          <ul className="space-y-2 mb-4">
                            {item.points.map((point, pIndex) => (
                              <li key={pIndex} className="flex items-start gap-3">
                                <span className="text-[#12deba] mt-1">+</span>
                                <span className="text-white/70">{point}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-[#12deba] font-bold text-sm">
                            {item.highlight}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-4"
            >
              <MagneticButton asWrapper>
                <CalendlyButton
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#E55555] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-[#FF6B6B]/40 transition-all group"
                >
                  See How We Can Help You
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
      </div>
    </section>
  )
}
