import { Metadata } from 'next'
import { getClients } from '@/lib/content'
import MetaPixel from '@/components/MetaPixel'
import CalendlyTracker from '@/components/CalendlyTracker'
import LandingNav from '@/components/landing/LandingNav'
import DiscoveryHero from '@/components/landing/DiscoveryHero'
import ProblemSection from '@/components/landing/ProblemSection'
import SolutionSection from '@/components/landing/SolutionSection'
import RotatingClients from '@/components/RotatingClients'
import ProcessSimple from '@/components/landing/ProcessSimple'
import CtaBanner from '@/components/landing/CtaBanner'
import FinalCTA from '@/components/landing/FinalCTA'
import FooterLanding from '@/components/landing/FooterLanding'

export const metadata: Metadata = {
  title: 'Book a Discovery Call | jerelle.co',
  description: 'Strategic video content that builds trust and drives real results for Southern Alberta businesses. Book your free 15-minute discovery call.',
  openGraph: {
    title: 'Book a Discovery Call | jerelle.co',
    description: 'Strategic video content that builds trust and drives real results for Southern Alberta businesses.',
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
      {/* Meta Pixel */}
      <MetaPixel />
      
      {/* Calendly Event Tracker */}
      <CalendlyTracker />

      {/* Calendly CSS */}
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />

      <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
        {/* Navigation - Links to main site */}
        <LandingNav />

        {/* Hero with Video - Add top padding for fixed nav */}
        <div className="pt-16">
          <DiscoveryHero />
        </div>

        {/* Problem/Agitation - Scannable cards */}
        <ProblemSection />

        {/* Solution + USP */}
        <SolutionSection />

        {/* Social Proof - Using same component as main site */}
        <RotatingClients clients={clients} whiteLogos={whiteLogos} />

        {/* Simple Process */}
        <ProcessSimple />

        {/* CTA Banner - Push for booking */}
        <CtaBanner />

        {/* Final CTA with Calendly Embed */}
        <FinalCTA />

        {/* Footer */}
        <FooterLanding />
      </main>
    </>
  )
}