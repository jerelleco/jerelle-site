'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'

type UserGoal = 'customers' | 'brand' | 'event' | 'content' | 'explore' | null

interface ContactDarkProps {
  userGoal?: UserGoal
}

export default function ContactDark({ userGoal }: ContactDarkProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    message: ''
  })
  const [contactError, setContactError] = useState('')

  // Dynamic placeholder based on user goal
  const getMessagePlaceholder = () => {
    switch (userGoal) {
      case 'customers':
        return "Tell me about your business. What's working? What's not getting the traction you expected?"
      case 'brand':
        return "What's the gap between how your business actually is and how it looks online?"
      case 'event':
        return "Tell me about your event. Date, location, what you're hoping to capture."
      case 'content':
        return "What does your marketing team need help with? What keeps falling off the list?"
      case 'explore':
        return "Not sure where to start? Just tell me what's on your mind."
      default:
        return "What's going on with your business right now? What are you trying to figure out?"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate at least one contact method
    if (!formData.email && !formData.phone) {
      setContactError('Please provide either an email or phone number')
      return
    }

    setContactError('')
    console.log('Form submitted:', formData)
    alert("Got it. I'll be in touch within 24 hours.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    // Clear error when user starts typing in email or phone
    if (e.target.name === 'email' || e.target.name === 'phone') {
      setContactError('')
    }
  }

  return (
    <section ref={ref} id="contact" className="relative py-32 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#12deba] rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Let's figure out if this makes sense
          </h2>
          <p className="text-2xl text-white/60">
            No pressure. No weird sales tactics. Just a conversation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#12deba] transition-colors"
              />
            </div>

            {/* Business */}
            <div>
              <input
                type="text"
                name="business"
                value={formData.business}
                onChange={handleChange}
                placeholder="Your business"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#12deba] transition-colors"
              />
            </div>

            {/* Email and Phone row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full px-6 py-4 bg-white/5 border rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#12deba] transition-colors ${
                    contactError ? 'border-red-500/50' : 'border-white/10'
                  }`}
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className={`w-full px-6 py-4 bg-white/5 border rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#12deba] transition-colors ${
                    contactError ? 'border-red-500/50' : 'border-white/10'
                  }`}
                />
              </div>
            </div>

            {/* Contact error message */}
            {contactError && (
              <p className="text-red-400 text-sm">{contactError}</p>
            )}

            {/* Helper text */}
            <p className="text-white/40 text-sm">At least one contact method required</p>

            {/* Message - Dynamic placeholder based on goal */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={getMessagePlaceholder()}
                rows={4}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#12deba] transition-colors resize-none"
              />
            </div>

            {/* Submit Button - MAGNETIC with proper padding */}
            <MagneticButton
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-[#12deba] to-[#0ea088] text-black font-bold rounded-xl text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Send it over</span>
              <motion.div
                className="absolute inset-0 bg-white pointer-events-none"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.2 }}
              />
            </MagneticButton>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 mb-2">Rather just email directly?</p>
          <a href="mailto:hello@jerelle.co" className="text-[#12deba] hover:underline text-lg">
            hello@jerelle.co
          </a>
        </motion.div>
      </div>
    </section>
  )
}
