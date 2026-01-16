'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import type { Service } from '@/lib/content'
import MagneticButton from './MagneticButton'
import ImageCarousel from './ImageCarousel'

interface ServicesRevealProps {
  services: Service[]
}

// Image arrays for each service
const serviceImages: { [key: string]: string[] } = {
  'social-content': [
    '/images/WarhammerPaintingEventCoverage.jpg',
    '/images/JeremyBTS-ParadeCoverage.jpg',
    '/images/ArchitechturalPhotoBMOCentreCalgary.jpg',
    '/images/SemiTruckRollerPhoto.jpg',
    '/images/BTSBeausBiriaCommercialVideo2.jpg',
    '/images/BTSContentCreation.jpg',
    '/images/ArchitechturalPhotoBMOCentreCalgaryPerson.jpg'
  ],

  'video-production': [
    '/images/JeremyBTS-ParadeCoverage.jpg',
    '/images/BTSContentCreation.jpg',
    '/images/BTSBeausBiriaCommercialVideo2.jpg',
    '/images/SemiTruckRollerPhoto.jpg'
  ],
  'commercial-photography': [
    '/images/ArchitechturalPhotoBMOCentreCalgaryBUILDING.jpg',
    '/images/TaroNoodleHouse-Product Photography-SteamBuns.jpg',
    '/images/SemiTruckRollerPhoto.jpg',
    '/images/CedarDiningTable-Product&LifestyleShoot.jpg',
    '/images/TaroNoodleHouse-ProductPhotography-Steam Buns-PickUp.jpg',
    '/images/LegendWater-ProductShot.jpg',
    '/images/ArchitechturalPhotoBMOCentreCalgaryPerson.jpg'
  ],
  'event-coverage': [
    '/images/GameConCanadaEventCoverage-WarhammerTournament.jpg',
    '/images/GameConCanadaEventCoverage.jpg',
    '/images/GameConCanadaEventCoverageGamingTournament2.jpg',
    '/images/GameConCanadaEventCoverage-AleksPaunovic-StevenOgg-MatthewLillard.jpg',
    '/images/GameConCanadaEventCoverage-FasterPurpleWormKillKill.jpg',
    '/images/WarhammerPaintingEventCoverage.jpg',
    '/images/CelebrateDowntownYQLEventCoverage.jpg',
    '/images/MatthewLillard-Interview-Headshot.jpg'
  ]
}

export default function ServicesReveal({ services }: ServicesRevealProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isInSection, setIsInSection] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Track if user is in services section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const inSection = rect.top < window.innerHeight && rect.bottom > 0
      setIsInSection(inSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Create an "All Services" tab option
  const allServicesTab = { id: 'all', title: 'All Services' }
  const tabOptions = [allServicesTab, ...services]

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative py-32 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #12deba 0%, transparent 70%)',
            'radial-gradient(circle at 80% 50%, #12deba 0%, transparent 70%)',
            'radial-gradient(circle at 20% 50%, #12deba 0%, transparent 70%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Mobile Floating Service Switcher */}
      <AnimatePresence>
        {isInSection && (
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: 'spring', damping: 25 }}
            className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40"
          >
            {/* Toggle Button with Vertical Text */}
            <motion.button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="bg-gradient-to-b from-[#12deba] to-[#0ea088] text-black font-bold rounded-l-xl shadow-xl py-4 px-2"
              whileTap={{ scale: 0.95 }}
              style={{ writingMode: 'vertical-rl' }}
            >
              <span className="text-sm tracking-wider uppercase">
                Choose Service
              </span>
            </motion.button>

            {/* Menu Panel */}
            <AnimatePresence>
              {showMobileMenu && (
                <motion.div
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: 300 }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="absolute right-0 top-0 bg-black/95 backdrop-blur-md border-l border-white/10 rounded-l-2xl shadow-2xl p-4 min-w-[250px]"
                >
                  <p className="text-xs uppercase tracking-wider text-[#12deba] mb-3 font-mono">
                    Jump to Service
                  </p>
                  
                  <div className="space-y-2">
                    {tabOptions.map((tab, index) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(index)
                          setShowMobileMenu(false)
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          activeTab === index
                            ? 'bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold'
                            : 'bg-white/5 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{tab.title}</span>
                          {activeTab === index && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            className="text-[#12deba] uppercase tracking-wider text-sm mb-4 font-mono"
          >
            Our Services
          </motion.p>
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            What We Do
          </motion.h2>
          
          {/* HANDWRITTEN TAGLINE */}
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-accent text-3xl md:text-4xl text-[#12deba] mb-4"
          >
            (It's pretty straightforward, actually)
          </motion.p>

          <motion.p
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Commercial photography and video production that delivers results.
          </motion.p>
        </motion.div>

        {/* Tab Navigation - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 hidden md:block"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            {tabOptions.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`relative px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  activeTab === index
                    ? 'text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {/* Active background */}
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#12deba] to-[#0ea088] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Tab text */}
                <span className="relative z-10 text-sm md:text-base">
                  {tab.title}
                </span>
              </button>
            ))}
          </div>
          
          {/* Decorative underline */}
          <div className="flex justify-center">
            <div className="h-[2px] w-full max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </motion.div>

        {/* Service Content */}
        <div className="max-w-6xl mx-auto min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 0 ? (
              // All Services View - Grid of all services
              <motion.div
                key="all-services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {services.map((service, index) => (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveTab(index + 1)}
                    className="group relative p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-[#12deba]/50 transition-all duration-300 text-left overflow-visible"
                  >
                    {/* Service Number Badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#12deba] to-[#0ea088] rounded-full flex items-center justify-center shadow-lg shadow-[#12deba]/30 z-10">
                      <span className="text-lg font-bold text-black">{`0${index + 1}`}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-2xl font-bold mb-3 group-hover:text-[#12deba] transition-colors relative z-10">
                      {service.title}
                    </h4>

                    {/* Description */}
                    <p className="text-white/60 mb-4 line-clamp-2 relative z-10">
                      {service.description}
                    </p>

                    {/* Price - HANDWRITTEN */}
                    <p className="font-accent text-2xl text-[#12deba] relative z-10">
                      {service.price}
                    </p>

                    {/* View Details Arrow */}
                    <div className="absolute bottom-6 right-6 text-white/40 group-hover:text-[#12deba] transition-colors z-10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#12deba]/10 to-transparent rounded-2xl" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              // Individual Service View
              services.map((service, index) => 
                activeTab === index + 1 && (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid lg:grid-cols-2 gap-12 items-start"
                  >
                    {/* Image Side with Overlaid CTA */}
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="relative lg:sticky lg:top-8"
                    >
                      {/* Image Carousel - REPLACES PLACEHOLDER */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                        <ImageCarousel images={serviceImages[service.id] || []} />

                        {/* CTA Button - Overlaid on Bottom Left */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="absolute bottom-6 left-6 right-6 z-20"
                        >
                          <MagneticButton
                            href="#contact"
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-[#12deba]/50 transition-all text-base group"
                          >
                            <span>Book a Discovery Call</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </MagneticButton>
                        </motion.div>
                      </div>

                      {/* Free consultation text under photo */}
                      <p className="font-accent text-base text-white/40 mt-4">
                        Free 15-minute consultation • No pressure
                      </p>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="space-y-6 pt-2"
                    >
                      {/* Title - FIXED with padding */}
                      <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-[#12deba] bg-clip-text text-transparent leading-tight pb-1">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xl text-white/70 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features - HANDWRITTEN LABEL */}
                      <div className="space-y-3">
                        <p className="font-accent text-2xl text-[#12deba]">
                          What's Included
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + (i * 0.1) }}
                              className="flex items-center gap-3 text-white/80"
                            >
                              <motion.span 
                                className="w-1.5 h-1.5 rounded-full bg-[#12deba]"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                              />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing - HANDWRITTEN */}
                      <div className="pt-6 border-t border-white/10">
                        <p className="font-accent text-lg text-white/50 mb-2">
                          Investment:
                        </p>
                        <p className="font-accent text-4xl text-[#12deba]">
                          {service.price}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              )
            )}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block relative">
            {/* Glowing background effect */}
            <motion.div
              className="absolute inset-0 bg-[#12deba]/20 blur-3xl rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/10 p-12">
              <h3 className="text-4xl md:text-5xl font-bold mb-4">
                Not Sure Which Service?
              </h3>
              
              {/* HANDWRITTEN NOTE */}
              <p className="font-accent text-2xl text-[#12deba] mb-6">
                (That's totally fine - most people aren't)
              </p>
              
              <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
                Let's talk about your goals and find the perfect solution together.
              </p>
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold rounded-full hover:shadow-2xl hover:shadow-[#12deba]/50 transition-shadow text-lg"
              >
                Get In Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
