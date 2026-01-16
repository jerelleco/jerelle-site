'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface MustacheDecorProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'teal' | 'dark'
  className?: string
  animate?: boolean
}

export default function MustacheDecor({ 
  size = 'small', 
  color = 'teal',
  className = '',
  animate = true 
}: MustacheDecorProps) {
  
  const sizeClasses = {
    small: 'w-12 h-auto',
    medium: 'w-24 h-auto',
    large: 'w-48 h-auto'
  }

  const imageSrc = color === 'teal' 
    ? '/secondary-moustache-12deba.png'
    : '/secondary-moustache-323232.png'

  return (
    <motion.div
      initial={animate ? { opacity: 0, rotate: -15 } : {}}
      animate={animate ? { 
        opacity: 1, 
        rotate: 0,
      } : {}}
      transition={animate ? { 
        duration: 0.8,
        ease: "easeOut"
      } : {}}
      className={`${sizeClasses[size]} ${className}`}
    >
      <Image
        src={imageSrc}
        alt=""
        width={200}
        height={67}
        className="w-full h-auto"
      />
    </motion.div>
  )
}
