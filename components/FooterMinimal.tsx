'use client'


import { motion } from 'framer-motion'
import Image from 'next/image'


export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }


  return (
    <footer className="relative bg-gradient-to-b from-black to-[#0a0a0a] border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Image
                src="/logos/Jerelle Logos/Jerelle.co (WHITE).svg"
                alt="Jerelle.co"
                width={140}
                height={45}
                className="h-10 w-auto hover:brightness-0 hover:invert hover:sepia hover:hue-rotate-[140deg] hover:saturate-[500%] transition-all duration-300"
              />
            </motion.button>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              Commercial photography and video production for businesses that want results, not excuses.
            </p>
            <p className="font-accent text-[#12deba] text-lg">
              Southern Alberta
            </p>
          </div>


          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-white/80 font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-white/60 hover:text-[#12deba] transition-colors text-sm block"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('process')}
                  className="text-white/60 hover:text-[#12deba] transition-colors text-sm block"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white/60 hover:text-[#12deba] transition-colors text-sm block"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-white/60 hover:text-[#12deba] transition-colors text-sm block"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>


          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-white/80 font-bold mb-4">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <a
                href="tel:3065151774"
                className="block group"
              >
                <span className="text-xs text-white/40 block mb-1">Phone</span>
                <span className="text-white/70 group-hover:text-[#12deba] transition-colors font-mono text-sm">
                  306 515-1774
                </span>
              </a>
              <a
                href="mailto:hello@jerelle.co"
                className="block group"
              >
                <span className="text-xs text-white/40 block mb-1">Email</span>
                <span className="text-white/70 group-hover:text-[#12deba] transition-colors text-sm">
                  hello@jerelle.co
                </span>
              </a>
              <div>
                <span className="text-xs text-white/40 block mb-1">Location</span>
                <span className="text-white/70 text-sm">
                  Lethbridge, AB
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Jerelle.co • All rights reserved
          </p>
          
          {/* Social Links */}
<div className="flex items-center gap-6">
  <a
    href="https://www.instagram.com/jeremy.jerelle/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/40 hover:text-[#12deba] transition-colors"
    aria-label="Instagram"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
      <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  </a>
  <a
    href="https://www.linkedin.com/in/jeremy-mcpherson/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/40 hover:text-[#12deba] transition-colors"
    aria-label="LinkedIn"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  </a>
</div>

          
          <p className="font-accent text-white/30 text-sm">
            Real work for real businesses
          </p>
        </div>
      </div>


      {/* Subtle accent line at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#12deba]/30 to-transparent" />
    </footer>
  )
}
