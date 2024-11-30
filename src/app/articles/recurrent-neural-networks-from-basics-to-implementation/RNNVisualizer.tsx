'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'

interface RNNVisualizerProps {
  inputSequence?: string
  speed?: number
}

const RNNVisualizer: React.FC<RNNVisualizerProps> = ({
  inputSequence = 'Hello',
  speed = 1.5,
}) => {
  const [currentChar, setCurrentChar] = useState(0)
  const [hiddenState, setHiddenState] = useState('Initial State')
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentChar((prev) => {
          if (prev >= inputSequence.length - 1) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
        setHiddenState(`Hidden State ${currentChar + 1}`)
      }, speed * 1000)

      return () => clearInterval(timer)
    }
  }, [isPlaying, inputSequence, speed, currentChar])

  const handlePlay = () => {
    setCurrentChar(0)
    setHiddenState('Initial State')
    setIsPlaying(true)
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">
        RNN Processing Visualization
      </h3>

      {/* Network Structure */}
      <div className="relative mb-6 h-64">
        {/* Input Layer */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 transform">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold text-white"
            animate={{
              scale: currentChar === 0 ? 1.2 : 1,
              backgroundColor: currentChar === 0 ? '#3B82F6' : '#93C5FD',
            }}
          >
            {inputSequence[currentChar] || '?'}
          </motion.div>
        </div>

        {/* Hidden State */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          animate={{
            scale: isPlaying ? 1.1 : 1,
            rotate: isPlaying ? 360 : 0,
          }}
          transition={{ duration: speed }}
        >
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-green-500 p-4 text-center font-bold text-white">
            <motion.span
              key={hiddenState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {hiddenState}
            </motion.span>
          </div>
        </motion.div>

        {/* Output Layer */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 font-bold text-white"
            animate={{
              scale: currentChar > 0 ? 1.2 : 1,
              backgroundColor: currentChar > 0 ? '#7C3AED' : '#C4B5FD',
            }}
          >
            {currentChar > 0 ? inputSequence[currentChar - 1] : '?'}
          </motion.div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 h-full w-full" style={{ zIndex: -1 }}>
          <motion.path
            d="M 48 32 L 160 32"
            stroke="#CBD5E1"
            strokeWidth="2"
            fill="none"
            animate={{
              stroke: isPlaying ? '#3B82F6' : '#CBD5E1',
            }}
          />
          <motion.path
            d="M 240 32 L 352 32"
            stroke="#CBD5E1"
            strokeWidth="2"
            fill="none"
            animate={{
              stroke: isPlaying ? '#7C3AED' : '#CBD5E1',
            }}
          />
        </svg>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPlaying ? 'Processing...' : 'Process Sequence'}
        </button>
      </div>

      {/* Legend */}
      <div className="mt-6 text-sm text-gray-600">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span>Input Layer (Current Character)</span>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span>Hidden State (Network Memory)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
          <span>Output Layer (Prediction)</span>
        </div>
      </div>
    </div>
  )
}

export default RNNVisualizer
