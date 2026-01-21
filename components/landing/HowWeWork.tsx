'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import CalendlyButton from '@/components/CalendlyButton'
import MagneticButton from '@/components/MagneticButton'

export default function HowWeWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState(0)

  const options = [
    {
      label: "Option 1",
      title: "Social Content Productions",
      bestFor: "Businesses that need fresh, performance-driven content for social media and digital marketing.",
      features: [
        "Strategy session to understand your goals and audience",
        "On-location or in-studio production day",
        "Story-driven photo and video content (not random B-roll)",
        "Multiple formats optimized for Instagram, Facebook, LinkedIn, YouTube, TikTok",
        "Assets designed to stop the scroll and drive action"
      ],
      image: "/Images/BTSContentCreation.jpg"
    },
    {
      label: "Option 2",
      title: "Commercial Productions",
      bestFor: "Product launches, major campaigns, or businesses ready to make a big move.",
      features: [
        "Full concept development based on your business goals",
        "Complete production (scripting, shoot, post-production)",
        "Commercial-grade storytelling for social ads, TV, or cinema",
        "Supporting assets from the same production",
        "Content designed to convert, not just entertain"
      ],
      badges: ["Social Media", "Movie Theatre Screens", "Broadcast TV"],
      image: "/Images/BTSBeausBiriaCommercialVideo2.jpg"
    }
  ]

  return (
    <section ref={ref} className="relative py-24 px-6 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      <div className="container mx-auto max-w-5xl relative z-10">
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
              How We Work
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Two Ways to Work With Us
          </h2>
          <p className="text-lg text-white/60">
            Choose the approach that fits your current needs.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-4 mb-8"
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${
                activeTab === index
                  ? 'bg-[#12deba] text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="block text-xs uppercase tracking-wider mb-1 opacity-70">
                {option.label}
              </span>
              <span className="block text-lg">
                {option.title}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8 items-start"
        >
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src={options[activeTab].image}
              alt={options[activeTab].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Best For Badge */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="text-[#12deba] font-bold text-sm mb-1">Best for:</p>
                <p className="text-white/80 text-sm">{options[activeTab].bestFor}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <p className="text-white/50 font-bold uppercase text-xs tracking-wider mb-6">
              What you get
            </p>

            <ul className="space-y-4 mb-8">
              {options[activeTab].features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#12deba]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#12deba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>

            {options[activeTab].badges && (
              <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white/40 text-xs mb-3">We've produced commercials for:</p>
                <div className="flex flex-wrap gap-2">
                  {options[activeTab].badges.map((badge, bIndex) => (
                    <span
                      key={bIndex}
                      className="bg-[#12deba]/10 text-[#12deba] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <MagneticButton asWrapper>
              <CalendlyButton
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#E55555] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-[#FF6B6B]/40 transition-all group"
              >
                See If This Is Right For You
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
