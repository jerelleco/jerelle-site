'use client'

import { motion } from 'framer-motion'

export default function BackgroundLayer() {
  return (
    <>
      {/* Main fixed background */}
      <div className="fixed inset-0 -z-10 bg-black" />
      
      {/* Floating orbs that appear between sections */}
      <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#12deba] rounded-full blur-[150px]"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -50, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-[#12deba] rounded-full blur-[150px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.12, 0.22, 0.12],
            x: [0, 60, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
          className="absolute bottom-1/4 left-1/3 w-[650px] h-[650px] bg-[#12deba] rounded-full blur-[150px]"
        />
      </div>
    </>
  )
}
