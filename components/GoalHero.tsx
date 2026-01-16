'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import ImageCarousel from './ImageCarousel'

interface GoalHeroProps {
  goal: 'customers' | 'brand' | 'event' | 'content' | 'explore'
}

const goalContent = {
  customers: {
    headline: "You don't have a visibility problem.",
    headlineAccent: "You have a consistency problem.",
    subhead: "Your competitors aren't better than you. They just show up more.",
    intro: "You've built something real. Customers who find you tend to stay. But somewhere along the line, you stopped being the loudest voice in the room.",
    keyPoints: [
      {
        title: "The real issue",
        text: "Your marketing person is stretched thin. Video keeps falling to the bottom of the list. Meanwhile, competitors with worse products are everywhere."
      },
      {
        title: "What actually works",
        text: "The companies winning right now aren't the best. They're the most visible. Visibility isn't luck. It's showing up with the right content, consistently."
      },
      {
        title: "How we help",
        text: "We plug into your existing marketing. Your team keeps control. We deliver professional video and photo, ready to post. No agency takeover. No creative drama."
      }
    ],
    bullets: [
      "One shoot becomes weeks of content",
      "Files delivered formatted and ready to post",
      "Quick turnaround when you need it",
      "Strategy included, not just cameras"
    ],
    cta: "Let's talk about your goals",
    secondaryCta: "See how it works",
    images: [
      '/images/TaroNoodleHouse-Product Photography-SteamBuns.jpg',
      '/images/TaroNoodleHouse-ProductPhotography-Steam Buns-PickUp.jpg',
      '/images/CedarDiningTable-Product&LifestyleShoot.jpg',
      '/images/SemiTruckRollerPhoto.jpg',
      '/images/CelebrateDowntownYQLEventCoverage.jpg'
    ]
  },
  brand: {
    headline: "Your reputation is worth more",
    headlineAccent: "than your website suggests.",
    subhead: "People Google you before they call you. What do they find?",
    intro: "You've spent years building something you're proud of. Real expertise. Real results. But when someone looks you up online, they see a business that looks smaller than it is.",
    keyPoints: [
      {
        title: "The gap",
        text: "Stock photos. DIY graphics. Maybe a video from 2019 you're embarrassed by now. Your online presence is working against everything you've built."
      },
      {
        title: "First impressions matter",
        text: "People decide in seconds whether you're worth their time. Professional imagery makes someone think 'these people know what they're doing' before they ever call."
      },
      {
        title: "What you get",
        text: "Professional imagery that matches your reputation. Video that shows the real business, the real people, the real reason customers choose you."
      }
    ],
    bullets: [
      "Brand photography that actually looks like you",
      "Video content you're proud to share",
      "Consistent visual identity across platforms",
      "Fast delivery so you're not waiting months"
    ],
    cta: "Let's talk about your brand",
    secondaryCta: "See the services",
    images: [
      '/images/BTSBeau-sBiria CommercialVideo (2).jpg',
      '/images/GameConCanadaEventCoverageGamingTournament2.jpg',
      '/images/MatthewLillard-Interview-Headshot.jpg',
      '/images/JeremyBTS-ParadeCoverage.jpg'
    ]
  },
  event: {
    headline: "You're putting months into this event.",
    headlineAccent: "Don't let it disappear overnight.",
    subhead: "Without proper coverage, your event becomes a memory instead of a marketing asset.",
    intro: "You've got speakers lined up. Sponsors on board. Attendees registered. But here's what happens to most events: they come, they go, and all you have left is a few iPhone photos.",
    keyPoints: [
      {
        title: "The missed opportunity",
        text: "A well-documented event gives you content for months. Highlight reels for next year. Testimonials from attendees. Behind-the-scenes moments that show personality."
      },
      {
        title: "How we work",
        text: "I've covered events of all sizes. Corporate conferences, community festivals, grand openings, trade shows. I stay out of the way while capturing what matters."
      },
      {
        title: "Fast when you need it",
        text: "Need a highlight reel before your event ends? Same-day edits available. Need photos for a press release the next morning? We make it happen."
      }
    ],
    bullets: [
      "Same-day highlight reels available",
      "Next-day photo delivery when needed",
      "Full coverage without disrupting your event",
      "Content you'll actually use for months"
    ],
    cta: "Let's cover your event",
    secondaryCta: "See event coverage details",
    images: [
      '/images/GameConCanadaEventCoverageGamingTournament2.jpg',
      '/images/JeremyBTS-ParadeCoverage.jpg',
      '/images/GameConCanadaEventCoverage.jpg',
      '/images/GameConCanadaCosplayEventCoverage.jpg',
      '/images/GameConCanadaEventCoverage-FasterPurpleWormKillKill.jpg',
      '/images/GameConCanadaEventCoverage-AleksPaunovic-StevenOgg-MatthewLillard.jpg',
      '/images/GameConCanadaEventCoverage-WarhammerTournament.jpg',
      '/images/WarhammerPaintingEventCoverage.jpg',
      '/images/CelebrateDowntownYQLEventCoverage.jpg'
    ]
  },
  content: {
    headline: "Your marketing person isn't lazy.",
    headlineAccent: "They're buried.",
    subhead: "Video keeps falling to the bottom of the list because it's the hardest thing on the list.",
    intro: "You have someone handling marketing. They're good at what they do. But every time 'create more video content' comes up, it gets pushed to next week. Then next month.",
    keyPoints: [
      {
        title: "It's not a priority problem",
        text: "It's a capacity problem. Your marketing person can write copy, schedule posts, manage campaigns. But producing professional video requires equipment, skills, and time they don't have."
      },
      {
        title: "How this works",
        text: "I plug directly into your existing operation. Your team keeps control. I give them the assets they're missing. Professional video and photo, delivered ready to post."
      },
      {
        title: "The result",
        text: "A steady stream of content that makes your marketing person look like a genius. No agency takeover. No managing some creative prima donna."
      }
    ],
    bullets: [
      "Monthly content batches from single shoots",
      "Files sized and formatted for each platform",
      "Quick turnaround on urgent requests",
      "Your team stays in control"
    ],
    cta: "Let's fill the content gap",
    secondaryCta: "See content packages",
    images: [
      '/images/CedarDiningTable-Product&LifestyleShoot.jpg',
      '/images/JeremyBTS-ParadeCoverage.jpg',
      '/images/MatthewLillard-Interview-Headshot.jpg',
      '/images/BTSBeau-sBiriaCommercialVideo.jpg'
    ]
  },
  explore: {
    headline: "The right film does what your team's been trying to do",
    headlineAccent: "in every conversation.",
    subhead: "Businesses want customers. Non-profits want believers. Both need a story that lands.",
    handwrittenNote: "It connects the dots and gets people over the line.",
    intro: "When you invest in film, you're not buying content. You're buying results.",
    introBullets: [
      "Sales teams need something that warms people up before the call",
      "Fundraising teams need something that makes giving feel obvious",
      "Everyone needs a story that travels into rooms you're not in"
    ],
    keyPoints: [
      {
        title: "Shorten the cycle",
        text: "Show the problem, the people, and the payoff. By the time they talk to you, they're not asking 'What do you do?' They're asking 'How do we start?'"
      },
      {
        title: "Give your team one story",
        text: "Most teams tell slightly different versions of the same thing. A strong film becomes the anchor. Same story, same proof, whether it's a sales meeting or a campaign launch."
      },
      {
        title: "Turn one shoot into months of content",
        text: "A well-planned shoot gives you a flagship film plus dozens of cutdowns you can use across your site, email, and social. Less scrambling. More consistency."
      }
    ],
    bullets: [
      "One story for sales, campaigns, and outreach",
      "Material for social, pitches, and landing pages",
      "Real people and outcomes, not stock footage",
      "A tool your team actually uses"
    ],
    cta: "Let's tell your story",
    secondaryCta: "See how it works",
    images: []
  }
}

export default function GoalHero({ goal }: GoalHeroProps) {
  const content = goalContent[goal]
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll to this section when it mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] py-24 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12deba]/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {content.headline}<br />
            <span className="text-[#12deba]">{content.headlineAccent}</span>
          </h2>
          <p className="text-2xl text-white/60 font-light max-w-3xl mx-auto">
            {content.subhead}
          </p>

          {/* Handwritten note - only for explore */}
          {goal === 'explore' && 'handwrittenNote' in content && (
            <motion.p 
              className="text-xl text-[#12deba] font-handwriting mt-6 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {content.handwrittenNote}
            </motion.p>
          )}
        </motion.div>

        {/* Mobile Image - Shows after title on mobile only */}
        {content.images && content.images.length > 0 && (
          <div className="lg:hidden mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-[#12deba]/20 border border-white/10 aspect-video">
            <ImageCarousel images={content.images} />
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Intro paragraph */}
            <p className="text-xl text-white/70 leading-relaxed">
              {content.intro}
            </p>

            {/* Intro bullets - only for explore */}
            {goal === 'explore' && 'introBullets' in content && (
              <ul className="space-y-3">
                {content.introBullets.map((bullet, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-white/70"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-[#12deba] mt-1">•</span>
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            {/* Key Points */}
            <div className="space-y-6">
              {content.keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <h3 className="text-[#12deba] font-bold text-lg mb-2">
                    {point.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {point.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Image & Bullets (Desktop) */}
          <div className="space-y-8">
            {/* Image Placeholder - Desktop only */}
            {content.images && content.images.length > 0 && (
              <div className="hidden lg:block rounded-3xl overflow-hidden shadow-2xl shadow-[#12deba]/20 border border-white/10 aspect-video">
                <ImageCarousel images={content.images} />
              </div>
            )}

            {/* Bullet Points - NO BACKGROUND BOX */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                What you get
              </h3>
              <ul className="space-y-4">
                {content.bullets.map((bullet, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-white/80"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <svg 
                      className="w-6 h-6 text-[#12deba] flex-shrink-0 mt-0.5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* Primary CTA - Goes to Contact */}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold rounded-full hover:shadow-2xl hover:shadow-[#12deba]/50 transition-all text-lg group"
          >
            {content.cta}
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </button>

          {/* Secondary CTA - Scrolls to services */}
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/80 font-medium rounded-full hover:border-white/40 hover:text-white transition-all text-base"
          >
            {content.secondaryCta}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
