'use client'

import { useEffect } from 'react'

export default function CalendlyTracker() {
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_scheduled') {
        // Fire Lead event
        if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Discovery Call Booked',
            content_category: 'Calendly Booking'
          })
        }

        // Fire Schedule event
        if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
          (window as any).fbq('track', 'Schedule', {
            content_name: 'Discovery Call'
          })
        }

        console.log('📊 Lead event fired to Meta Pixel')
      }
    }

    window.addEventListener('message', handleCalendlyEvent)
    return () => {
      window.removeEventListener('message', handleCalendlyEvent)
    }
  }, [])

  return null
}