'use client'

import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { trackCTAClick } from '@/lib/analytics'

interface CalendlyButtonProps {
  children: React.ReactNode
  className?: string
  location?: string // For analytics - where is this button located
}

// Track if Calendly assets have been loaded globally
let calendlyLoaded = false
let calendlyLoading = false
const loadCallbacks: (() => void)[] = []

function loadCalendlyAssets(callback?: () => void) {
  // If already loaded, call callback immediately
  if (calendlyLoaded) {
    callback?.()
    return
  }

  // If loading, queue the callback
  if (calendlyLoading) {
    if (callback) loadCallbacks.push(callback)
    return
  }

  calendlyLoading = true
  if (callback) loadCallbacks.push(callback)

  // Load CSS first
  const link = document.createElement('link')
  link.href = 'https://assets.calendly.com/assets/external/widget.css'
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  // Load JS
  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  script.onload = () => {
    calendlyLoaded = true
    calendlyLoading = false
    // Call all queued callbacks
    loadCallbacks.forEach(cb => cb())
    loadCallbacks.length = 0
  }
  script.onerror = () => {
    calendlyLoading = false
    console.error('Failed to load Calendly widget')
  }
  document.body.appendChild(script)
}

export default function CalendlyButton({ children, className = '', location = 'unknown' }: CalendlyButtonProps) {
  useEffect(() => {
    // Preload Calendly assets on mount
    loadCalendlyAssets()
  }, [])

  const openCalendly = useCallback(() => {
    // Track CTA click across all analytics platforms
    trackCTAClick('Book Discovery Call', location)

    // Also track with Meta Pixel directly for their Contact event
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Contact', {
        content_name: 'CTA Click - Book Discovery Call',
        content_category: location
      })
    }

    const initPopup = () => {
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        (window as any).Calendly.initPopupWidget({
          url: 'https://calendly.com/jerelle-co/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=12deba'
        })
      }
    }

    // If Calendly is loaded, open immediately. Otherwise, load and then open.
    if (calendlyLoaded && (window as any).Calendly) {
      initPopup()
    } else {
      loadCalendlyAssets(initPopup)
    }
  }, [location])

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