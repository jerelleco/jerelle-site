'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface CalendlyButtonProps {
  children: React.ReactNode
  className?: string
}

export default function CalendlyButton({ children, className = '' }: CalendlyButtonProps) {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup if needed
    }
  }, [])

  const openCalendly = () => {
    // Track CTA click with Meta Pixel (Contact event - less valuable than Lead)
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Contact', {
        content_name: 'CTA Click - Book Discovery Call'
      })
    }

    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/jerelle-co/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=12deba'
      })
    }
  }

  return (
    <motion.button
      onClick={openCalendly}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}