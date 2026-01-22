// Unified analytics helper - sends events to GA4, Meta Pixel, and Clarity

type EventProperties = Record<string, string | number | boolean | undefined>

// Core tracking function that sends to all platforms
export function trackEvent(eventName: string, properties?: EventProperties) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties)
  }

  // Meta Pixel (for relevant events)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    // Map to Meta standard events where applicable
    const metaEventMap: Record<string, string> = {
      'goal_selected': 'CustomizeProduct',
      'service_viewed': 'ViewContent',
      'contact_form_started': 'InitiateCheckout',
      'cta_clicked': 'Contact',
    }

    const metaEvent = metaEventMap[eventName]
    if (metaEvent) {
      (window as any).fbq('track', metaEvent, properties)
    } else {
      (window as any).fbq('trackCustom', eventName, properties)
    }
  }

  // Microsoft Clarity - tag session with event
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('set', eventName, JSON.stringify(properties || {}))
  }

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Analytics Event: ${eventName}`, properties)
  }
}

// Predefined event helpers for common actions

export function trackGoalSelection(goal: string) {
  trackEvent('goal_selected', {
    goal_type: goal,
    page_location: typeof window !== 'undefined' ? window.location.pathname : '',
  })
}

export function trackServiceView(serviceId: string, serviceName: string) {
  trackEvent('service_viewed', {
    service_id: serviceId,
    service_name: serviceName,
  })
}

export function trackServiceClick(serviceId: string, serviceName: string) {
  trackEvent('service_clicked', {
    service_id: serviceId,
    service_name: serviceName,
  })
}

export function trackSectionView(sectionName: string, percentVisible?: number) {
  trackEvent('section_viewed', {
    section_name: sectionName,
    percent_visible: percentVisible,
  })
}

export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', {
    depth_percent: depth,
  })
}

export function trackCTAClick(ctaName: string, location: string) {
  trackEvent('cta_clicked', {
    cta_name: ctaName,
    cta_location: location,
  })
}

export function trackFormInteraction(formName: string, action: 'started' | 'completed' | 'abandoned', field?: string) {
  trackEvent(`form_${action}`, {
    form_name: formName,
    field_name: field,
  })
}

export function trackVideoInteraction(action: 'play' | 'pause' | 'complete', videoName: string, percentWatched?: number) {
  trackEvent('video_interaction', {
    action,
    video_name: videoName,
    percent_watched: percentWatched,
  })
}

export function trackTimeOnPage(seconds: number) {
  trackEvent('time_on_page', {
    seconds,
    minutes: Math.floor(seconds / 60),
  })
}

// Track outbound link clicks
export function trackOutboundLink(url: string, linkText?: string) {
  trackEvent('outbound_link_click', {
    url,
    link_text: linkText,
  })
}
