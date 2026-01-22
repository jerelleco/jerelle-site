'use client'


import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import CalendlyButton from '@/components/CalendlyButton'


interface CinematicNavProps {
  onLogoClick?: () => void
}


export default function CinematicNav({ onLogoClick }: CinematicNavProps) {
  const [scrolled, setScrolled] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }


  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick()
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        {/* Three-column grid layout */}
        <div className="grid grid-cols-3 items-center">
          
          {/* Left - Logo */}
          <div className="flex justify-start">
            <motion.button
              onClick={handleLogoClick}
              className="relative group transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/logos/Jerelle Logos/Jerelle.co (WHITE).svg"
                alt="Jerelle.co"
                width={120}
                height={40}
                className="h-8 w-auto brightness-100 group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:hue-rotate-[140deg] group-hover:saturate-[500%] transition-all duration-300"
                priority
                style={{
                  filter: 'brightness(1)',
                }}
              />
            </motion.button>
          </div>


          {/* Center - Navigation Links */}
          <div className="flex justify-center">
            <div className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('services')}
                className="text-sm uppercase tracking-wider hover:text-[#12deba] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="text-sm uppercase tracking-wider hover:text-[#12deba] transition-colors"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm uppercase tracking-wider hover:text-[#12deba] transition-colors"
              >
                About
              </button>
            </div>
          </div>


          {/* Right - Contact Info & CTA */}
          <div className="flex justify-end items-center gap-6">
            {/* Contact Info - Hidden on mobile */}
            <div className="hidden md:flex flex-col items-end gap-1">
              <a
                href="tel:3065151774"
                className="text-sm text-white/60 hover:text-[#12deba] transition-colors font-mono"
              >
                306 515-1774
              </a>
              <a
                href="mailto:hello@jerelle.co"
                className="text-xs text-white/40 hover:text-[#12deba] transition-colors"
              >
                hello@jerelle.co
              </a>
            </div>


            {/* Discovery Call Button */}
            <CalendlyButton
              className="relative px-6 py-2.5 bg-gradient-to-r from-[#FF6B6B] to-[#E55555] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-[#FF6B6B]/50 transition-all text-sm overflow-hidden"
            >
              Book a Call
            </CalendlyButton>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
