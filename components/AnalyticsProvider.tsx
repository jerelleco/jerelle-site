'use client'

import { useScrollDepthTracking, useTimeOnPageTracking } from '@/hooks/useAnalytics'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  // Automatic scroll depth tracking
  useScrollDepthTracking()

  // Track time on page every 30 seconds
  useTimeOnPageTracking(30)

  return <>{children}</>
}
