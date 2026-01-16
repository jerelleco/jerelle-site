'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Client {
  name: string
  logo: string
}

interface RotatingClientsProps {
  clients: Client[]
  whiteLogos: string[]
}

const GRID_SIZE = 6

export default function RotatingClients({ clients, whiteLogos }: RotatingClientsProps) {
  const [displayedLogos, setDisplayedLogos] = useState<number[]>([])
  const [lastSwappedPosition, setLastSwappedPosition] = useState<number | null>(null)

  useEffect(() => {
    const initialLogos = clients.slice(0, GRID_SIZE).map((_, index) => index)
    setDisplayedLogos(initialLogos)
  }, [clients])

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLogos((current) => {
        const randomPosition = Math.floor(Math.random() * GRID_SIZE)
        
        if (randomPosition === lastSwappedPosition) {
          return current
        }

        const usedIndices = new Set(current)
        const availableIndices = clients
          .map((_, index) => index)
          .filter(index => !usedIndices.has(index))

        if (availableIndices.length === 0) return current

        const randomNewIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]

        const newLogos = [...current]
        newLogos[randomPosition] = randomNewIndex

        setLastSwappedPosition(randomPosition)

        return newLogos
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [clients, lastSwappedPosition])

  return (
    <section className="relative bg-black py-20">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Trusted By
          </h2>
          <p className="text-white/60 text-lg">
            Brands we've had the pleasure of working with
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
          {displayedLogos.map((logoIndex, position) => {
            const client = clients[logoIndex]
            const isWhiteLogo = whiteLogos.includes(client.logo)

            return (
              <AnimatePresence mode="wait" key={position}>
                <motion.div
                  key={`${position}-${logoIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-32 flex items-center justify-center"
                >
                  <div className={`relative w-48 h-full ${isWhiteLogo ? '' : 'brightness-0 invert'}`}>
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain opacity-100"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            )
          })}
        </div>
      </div>
    </section>
  )
}
