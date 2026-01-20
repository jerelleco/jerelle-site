'use client'

import { useEffect } from 'react'

export default function CalendlyInline() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup handled by React
    }
  }, [])

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
      data-url="https://calendly.com/jerelle-co/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=12deba"
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
}