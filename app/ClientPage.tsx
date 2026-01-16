'use client'

import { useState } from 'react'
import CinematicNav from '@/components/CinematicNav'
import CinematicHero from '@/components/CinematicHero'
import GoalHero from '@/components/GoalHero'
import PromoVideoSection from '@/components/PromoVideoSection'
import ProcessSection from '@/components/ProcessSection'
import ServicesReveal from '@/components/ServicesReveal'
import RotatingClients from '@/components/RotatingClients'
import AboutCinematic from '@/components/AboutCinematic'
import ContactDark from '@/components/ContactDark'
import FooterMinimal from '@/components/FooterMinimal'
import type { Service, Client, ProcessStep, ProcessGalleryImage } from '@/lib/content'

type UserGoal = 'customers' | 'brand' | 'event' | 'content' | 'explore' | null

interface ClientPageProps {
  allServices: Service[]
  clients: Client[]
  whiteLogos: string[]
  steps: ProcessStep[]
  galleryImages: ProcessGalleryImage[]
}

export default function ClientPage({ allServices, clients, whiteLogos, steps, galleryImages }: ClientPageProps) {
  const [userGoal, setUserGoal] = useState<UserGoal>(null)
  const [userJourney, setUserJourney] = useState<string[]>([])

  // Map goals to service priorities
  const getFilteredServices = () => {
    if (!userGoal || userGoal === 'explore') return allServices

    const goalMap: Record<string, string[]> = {
      'customers': ['video-production', 'social-content-creation', 'commercial-photography', 'event-coverage'],
      'brand': ['commercial-photography', 'video-production', 'social-content-creation', 'event-coverage'],
      'event': ['event-coverage', 'commercial-photography', 'video-production', 'social-content-creation'],
      'content': ['social-content-creation', 'video-production', 'commercial-photography', 'event-coverage']
    }

    const priorityIds = goalMap[userGoal]
    const priorityServices = priorityIds
      .map(id => allServices.find(s => s.id === id))
      .filter((s): s is Service => s !== undefined)

    return priorityServices
  }

  // Track user journey
  const handleGoalSelect = (goal: UserGoal) => {
    setUserGoal(goal)
    const goalLabel = {
      'customers': 'Get More Customers',
      'brand': 'Build Your Brand',
      'event': 'Cover an Event',
      'content': 'Regular Content',
      'explore': 'Just Exploring'
    }
    if (goal) {
      setUserJourney([...userJourney, `goal:${goalLabel[goal]}`])
    }
  }

  // Reset function for logo click
  const handleReset = () => {
    setUserGoal(null)
    setUserJourney([])
  }

  // Determine section order based on goal
  const getSectionOrder = () => {
    if (!userGoal || userGoal === 'explore') return 'default'
    // For specific goals, show services first
    if (userGoal === 'customers' || userGoal === 'content') return 'services-first' // They want action/results
    return 'trust-first' // Brand/event goals benefit from social proof first
  }

  const sectionOrder = getSectionOrder()
  const filteredServices = getFilteredServices()

  return (
    <>
      <CinematicNav onLogoClick={handleReset} />
      <CinematicHero onPathSelect={handleGoalSelect} />

      {/* Goal-specific hero section - only shows after selection */}
      {userGoal && <GoalHero goal={userGoal} />}

      {sectionOrder === 'services-first' ? (
        /* Action-oriented order */
        <>
          <ServicesReveal services={filteredServices} />
          <PromoVideoSection />
          <ProcessSection steps={steps} galleryImages={galleryImages} />
          <RotatingClients clients={clients} whiteLogos={whiteLogos} />
          <AboutCinematic />
        </>
      ) : sectionOrder === 'trust-first' ? (
        /* Trust-building order */
        <>
          <RotatingClients clients={clients} whiteLogos={whiteLogos} />
          <ServicesReveal services={filteredServices} />
          <PromoVideoSection />
          <ProcessSection steps={steps} galleryImages={galleryImages} />
          <AboutCinematic />
        </>
      ) : (
        /* Default order */
        <>
          <ServicesReveal services={filteredServices} />
          <PromoVideoSection />
          <ProcessSection steps={steps} galleryImages={galleryImages} />
          <AboutCinematic />
          <RotatingClients clients={clients} whiteLogos={whiteLogos} />
        </>
      )}

      <ContactDark userGoal={userGoal} />
      <FooterMinimal />
    </>
  )
}
