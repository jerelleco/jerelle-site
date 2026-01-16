'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMouseMoving, setIsMouseMoving] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [clickRipple, setClickRipple] = useState(false)
  const targetPosRef = useRef({ x: 0, y: 0 })
  const startPosRef = useRef({ x: 0, y: 0 })
  const wavePhaseRef = useRef(0)
  const lastMouseMoveTime = useRef(Date.now())
  const breathingPhase = useMotionValue(0)

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 })
  const dotX = useSpring(0, { stiffness: 1000, damping: 50 })
  const dotY = useSpring(0, { stiffness: 1000, damping: 50 })

  // Breathing animation - very subtle scale
  const breathingScale = useTransform(breathingPhase, [0, Math.PI * 2], [1, 1.08])

  // Breathing effect when idle
  useEffect(() => {
    let animationFrame
    let breathingTime = 0

    const animate = () => {
      if (!isMouseMoving && isVisible) {
        breathingTime += 0.02 // Slow breathing speed
        breathingPhase.set(Math.sin(breathingTime) * Math.PI)
      } else {
        breathingPhase.set(0) // Reset when moving
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isMouseMoving, isVisible, breathingPhase])

  useEffect(() => {
    let mouseTimeout

    const mouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsMouseMoving(true)
      setIsVisible(true)
      lastMouseMoveTime.current = Date.now()

      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        setIsMouseMoving(false)
        startPosRef.current = { x: e.clientX, y: e.clientY }
        wavePhaseRef.current = 0
      }, 1000)
    }

    const handleScrollStop = () => {
      // When scrolling, reset to mouse position (stop drifting)
      setIsMouseMoving(true)
      lastMouseMoveTime.current = Date.now()
    }

    // Click celebration
    const handleClick = () => {
      setClickRipple(true)
      setTimeout(() => setClickRipple(false), 600)
    }

    const mouseLeave = () => {
      setIsVisible(false)
      // Prevent cursor from drifting to 0,0 - move off-screen instead
      cursorX.set(-100)
      cursorY.set(-100)
      dotX.set(-100)
      dotY.set(-100)
    }

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('wheel', handleScrollStop, { passive: true })
    window.addEventListener('click', handleClick)
    document.addEventListener('mouseleave', mouseLeave)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('wheel', handleScrollStop)
      window.removeEventListener('click', handleClick)
      document.removeEventListener('mouseleave', mouseLeave)
      clearTimeout(mouseTimeout)
    }
  }, [cursorX, cursorY, dotX, dotY])

  // Find nearest button and set target - now checks viewport visibility
  useEffect(() => {
    if (!isMouseMoving && isVisible) {
      const magneticButtons = document.querySelectorAll('[data-magnetic="true"]')
      
      if (magneticButtons.length > 0) {
        let nearestButton = null
        let nearestDistance = Infinity

        magneticButtons.forEach((button) => {
          const rect = button.getBoundingClientRect()
          
          // Check if button is visible in viewport
          const isInViewport = 
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          
// Only consider buttons that are significantly visible (at least 50% in viewport)
const buttonHeight = rect.height
const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
const visibilityPercentage = visibleHeight / buttonHeight

const isSignificantlyVisible = 
  visibilityPercentage > 0.5 && // At least 50% visible
  rect.left >= 0 &&
  rect.right <= window.innerWidth

if (isSignificantlyVisible) {

            const buttonCenterX = rect.left + rect.width / 2
            const buttonCenterY = rect.top + rect.height / 2

            const distanceX = buttonCenterX - mousePos.x
            const distanceY = buttonCenterY - mousePos.y
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

            if (distance < nearestDistance) {
              nearestDistance = distance
              nearestButton = button
            }
          }
        })

if (nearestButton) {
  const rect = nearestButton.getBoundingClientRect()
  const buttonCenterX = rect.left + rect.width / 2
  const buttonCenterY = rect.top + rect.height / 2
  
  // Only drift if button is reasonably close (within 300px)
  const distanceToButton = Math.sqrt(
    Math.pow(buttonCenterX - startPosRef.current.x, 2) + 
    Math.pow(buttonCenterY - startPosRef.current.y, 2)
  )
  
  if (distanceToButton < 1000) {
    const maxDriftDistance = 100

    // Calculate direction to button
    const directionX = buttonCenterX - startPosRef.current.x
    const directionY = buttonCenterY - startPosRef.current.y
    const totalDistance = Math.sqrt(directionX * directionX + directionY * directionY)

    // Normalize direction and apply max distance
    if (totalDistance > 0) {
      const limitedDistance = Math.min(maxDriftDistance, totalDistance)
      const normalizedX = directionX / totalDistance
      const normalizedY = directionY / totalDistance

      targetPosRef.current = {
        x: startPosRef.current.x + normalizedX * limitedDistance,
        y: startPosRef.current.y + normalizedY * limitedDistance
      }
    }
  } else {
    // Button is too far - don't drift at all
    targetPosRef.current = { x: startPosRef.current.x, y: startPosRef.current.y }
  }
} else {
  // No button found - stay still
  targetPosRef.current = { x: startPosRef.current.x, y: startPosRef.current.y }
}

      } else {
        targetPosRef.current = { x: mousePos.x, y: mousePos.y }
      }
    }
  }, [isMouseMoving, isVisible, mousePos.x, mousePos.y])

  // Smooth flow animation with swimming motion
  useEffect(() => {
    if (!isMouseMoving && isVisible) {
      let animationFrame

      const animate = () => {
        const currentX = cursorX.get()
        const currentY = cursorY.get()

        const deltaX = targetPosRef.current.x - currentX
        const deltaY = targetPosRef.current.y - currentY

        // Calculate perpendicular direction for wave motion
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (distance > 1) {
          const speed = 0.05

          // Create swimming wave motion
          wavePhaseRef.current += 0.15 // Wave speed
          const waveAmplitude = 15 // Wave size
          const waveOffset = Math.sin(wavePhaseRef.current) * waveAmplitude

          // Perpendicular direction (rotated 90 degrees)
          const perpX = -deltaY / distance
          const perpY = deltaX / distance

          // Apply forward movement + wave motion
          const newX = currentX + deltaX * speed + perpX * waveOffset * 0.1
          const newY = currentY + deltaY * speed + perpY * waveOffset * 0.1

          cursorX.set(newX)
          cursorY.set(newY)
          dotX.set(newX)
          dotY.set(newY)
        }

        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    } else {
      // When moving, instantly follow mouse
      cursorX.set(mousePos.x)
      cursorY.set(mousePos.y)
      dotX.set(mousePos.x)
      dotY.set(mousePos.y)
    }
  }, [isMouseMoving, isVisible, mousePos.x, mousePos.y, cursorX, cursorY, dotX, dotY])

  return (
    <>
      {/* Outer ring - always teal with breathing */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-[30px] h-[30px] pointer-events-none z-[9999] hidden lg:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            scale: breathingScale,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              border: '2px solid #12deba',
              backgroundColor: 'rgba(18, 222, 186, 0.3)',
            }}
          />
        </motion.div>
      )}

      {/* Click celebration ripple */}
      {clickRipple && (
        <motion.div
          className="fixed top-0 left-0 w-[30px] h-[30px] pointer-events-none z-[9998] hidden lg:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              border: '2px solid #12deba',
            }}
          />
        </motion.div>
      )}

      {/* Inner dot - always teal */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-[4.8px] h-[4.8px] rounded-full pointer-events-none z-[9999] hidden lg:block"
          style={{
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
            backgroundColor: '#12deba',
          }}
        />
      )}
    </>
  )
}
