'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutCinematic() {
  return (
    <section id="about" className="relative min-h-screen bg-black flex items-center overflow-hidden py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <Image
          src="/big-moustache-12deba.png"
          alt=""
          width={1500}
          height={500}
          className="w-full max-w-6xl opacity-100"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            A bit about me
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed">
            <p>
              I've spent 10+ years working with businesses at every stage. Startups figuring out their first message. Established companies who know they should be doing more but can't find the time. And everything in between.
            </p>

            <p>
              Here's what I've learned: the businesses that win aren't always the best at what they do. They're the ones that show up consistently. The ones whose customers actually know who they are before they walk through the door.
            </p>

            <p>
              I'm based in Lethbridge. I work with people who'd rather have a real conversation than sit through a pitch deck. If that sounds like you, we'll probably get along.
            </p>

            <p className="text-[#12deba] font-accent text-4xl mt-8">
              - Jeremy
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}