'use client'

import { motion } from 'framer-motion'

interface PathSelectorProps {
  onPathSelect: (path: 'customers' | 'brand' | 'event' | 'content' | 'explore') => void
}

export default function PathSelector({ onPathSelect }: PathSelectorProps) {
  const paths = [
    {
      id: 'customers' as const,
      emoji: '💰',
      title: 'I need more customers',
      description: 'Marketing that actually brings people in',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'hover:border-green-500/50'
    },
    {
      id: 'brand' as const,
      emoji: '🎯',
      title: 'I need to look more professional',
      description: 'Your brand should match your reputation',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'hover:border-blue-500/50'
    },
    {
      id: 'event' as const,
      emoji: '📸',
      title: 'I have an event coming up',
      description: 'Capture it while it happens',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'hover:border-purple-500/50'
    },
    {
      id: 'content' as const,
      emoji: '📱',
      title: 'I need to post more consistently',
      description: 'Stop letting social media fall through the cracks',
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'hover:border-orange-500/50'
    },
    {
      id: 'explore' as const,
      emoji: '🤔',
      title: 'Just looking around',
      description: 'No rush. Take your time.',
      color: 'from-[#12deba]/20 to-[#0ea088]/20',
      borderColor: 'hover:border-[#12deba]/50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {paths.map((path, index) => (
        <motion.button
          key={path.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onPathSelect(path.id)}
          className={`group relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br ${path.color} backdrop-blur-sm ${path.borderColor} transition-all duration-300 text-left hover:scale-105`}
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
            {path.emoji}
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-[#12deba] transition-colors">
            {path.title}
          </h3>

          <p className="text-sm text-white/60">
            {path.description}
          </p>

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5 text-[#12deba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#12deba]/10 to-transparent rounded-2xl" />
          </div>
        </motion.button>
      ))}
    </div>
  )
}