'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FooterMinimal() {
  return (
    <footer className="bg-black py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-bold text-white">
            Jerelle
          </div>

          <div className="flex gap-8">
            <a href="#services" className="text-white/60 hover:text-[#12deba] transition-colors">
              Services
            </a>
            <a href="#about" className="text-white/60 hover:text-[#12deba] transition-colors">
              About
            </a>
            <a href="#contact" className="text-white/60 hover:text-[#12deba] transition-colors">
              Contact
            </a>
          </div>

          <div className="text-white/40 text-sm">
            © {new Date().getFullYear()} Jerelle
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            Lethbridge, Alberta
          </p>
        </div>
      </div>
    </footer>
  )
}