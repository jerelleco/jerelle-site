'use client'

import { useEffect, useRef, useCallback } from 'react'
import { trackScrollDepth, trackSectionView, trackTimeOnPage } from '@/lib/analytics'

// Track scroll depth milestones (25%, 50%, 75%, 100%)
export function useScrollDepthTracking() {
  const milestonesReached = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)

      const milestones = [25, 50, 75, 100]
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !milestonesReached.current.has(milestone)) {
          milestonesReached.current.add(milestone)
          trackScrollDepth(milestone)
        }
      }
    }

    // Throttle scroll events
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])
}

// Track when a section becomes visible
export function useSectionTracking(sectionName: string, threshold = 0.5) {
  const sectionRef = useRef<HTMLElement>(null)
  const hasTracked = useRef(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true
            trackSectionView(sectionName, Math.round(entry.intersectionRatio * 100))
          }
        })
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [sectionName, threshold])

  return sectionRef
}

// Track time spent on page
export function useTimeOnPageTracking(intervalSeconds = 30) {
  const startTime = useRef<number>(Date.now())
  const lastTracked = useRef<number>(0)

  useEffect(() => {
    const trackTime = () => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000)
      // Only track at intervals to avoid too many events
      const currentInterval = Math.floor(elapsed / intervalSeconds)
      if (currentInterval > lastTracked.current) {
        lastTracked.current = currentInterval
        trackTimeOnPage(elapsed)
      }
    }

    const interval = setInterval(trackTime, intervalSeconds * 1000)

    // Also track on page unload
    const handleUnload = () => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000)
      trackTimeOnPage(elapsed)
    }

    window.addEventListener('beforeunload', handleUnload)

    return () => {
      clearInterval(interval)
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [intervalSeconds])
}

// Create a ref callback for tracking section visibility
export function useTrackSection(sectionName: string) {
  const hasTracked = useRef(false)

  const refCallback = useCallback((node: HTMLElement | null) => {
    if (!node || hasTracked.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true
            trackSectionView(sectionName)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(node)
  }, [sectionName])

  return refCallback
}
