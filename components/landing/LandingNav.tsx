'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import CalendlyButton from '@/components/CalendlyButton'

export default function LandingNav() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Links to main site */}
          <a
            href="https://jerelle.co"
            className="flex items-center gap-3 group"
          >
            <Image
              src="/logos/Jerelle Logos/Jerelle.co (WHITE).svg"
              alt="Jerelle.co"
              width={120}
              height={40}
              className="h-8 w-auto group-hover:opacity-80 transition-opacity"
            />
            <span className="text-xs text-white/40 group-hover:text-[#12deba] transition-colors hidden sm:block">
              ← Main Site
            </span>
          </a>

          {/* CTA Button */}
          <CalendlyButton
            className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B6B] to-[#E55555] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#FF6B6B]/30 transition-all text-sm"
          >
            Book a Call
          </CalendlyButton>
        </div>
      </div>
    </motion.nav>
  )
}