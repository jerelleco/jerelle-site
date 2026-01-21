import { Metadata } from 'next'
import { getClients } from '@/lib/content'
import LandingNav from '@/components/landing/LandingNav'
import DiscoveryHero from '@/components/landing/DiscoveryHero'
import TheProblem from '@/components/landing/TheProblem'
import WhyDifferent from '@/components/landing/WhyDifferent'
import HowWeWork from '@/components/landing/HowWeWork'
import StoryVsSpectacle from '@/components/landing/StoryVsSpectacle'
import WhoThisIsFor from '@/components/landing/WhoThisIsFor'
import WhyNow from '@/components/landing/WhyNow'
import OurStory from '@/components/landing/OurStory'
import RotatingClients from '@/components/RotatingClients'
import FinalCTA from '@/components/landing/FinalCTA'
import FooterLanding from '@/components/landing/FooterLanding'

export const metadata: Metadata = {
  title: 'Book a Discovery Call | jerelle.co',
  description: 'You don\'t need a photographer. You need a story that sells. Story-driven commercials and marketing campaigns that turn viewers into customers.',
  openGraph: {
    title: 'Book a Discovery Call | jerelle.co',
    description: 'You don\'t need a photographer. You need a story that sells. Story-driven commercials and marketing campaigns that turn viewers into customers.',
    url: 'https://jerelle.co/discovery',
    siteName: 'jerelle.co',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function DiscoveryPage() {
  // Get clients data from content (same as main site)
  const { clients, whiteLogos } = getClients()

  return (
    <>
      {/* Calendly CSS */}
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />

      <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
        {/* Navigation - Links to main site */}
        <LandingNav />

        {/* Hero - Add top padding for fixed nav */}
        <div className="pt-16">
          <DiscoveryHero />
        </div>

        {/* Section 1: The Problem */}
        <TheProblem />

        {/* Social Proof - Client logos */}
        <RotatingClients clients={clients} whiteLogos={whiteLogos} />

        {/* Section 2: Why We're Different */}
        <WhyDifferent />

        {/* Section 3: How We Work (Two Options) */}
        <HowWeWork />

        {/* Section 4: Story vs. Spectacle */}
        <StoryVsSpectacle />

        {/* Section 5: Who This Is For */}
        <WhoThisIsFor />

        {/* Section 6: Why This Matters Now */}
        <WhyNow />

        {/* Section 8: Our Story */}
        <OurStory />

        {/* Final CTA with Calendly Embed */}
        <FinalCTA />

        {/* Footer */}
        <FooterLanding />
      </main>
    </>
  )
}
