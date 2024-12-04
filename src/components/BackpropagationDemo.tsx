'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'

// Types for our neural network
type Neuron = {
  id: string
  x: number
  y: number
  layer: number
  index: number
}

type Connection = {
  id: string
  from: string
  to: string
  weight: number
}

// Neural Network Architecture Configuration
const NETWORK_CONFIG = {
  layers: [4, 6, 6, 2], // Number of neurons in each layer
  neuronRadius: 12,
  layerSpacing: 160,
  neuronSpacing: 50,
}

const NeuralNetworkViz = () => {
  const [neurons, setNeurons] = useState<Neuron[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [hoveredNeuron, setHoveredNeuron] = useState<string | null>(null)

  // Initialize network layout
  useEffect(() => {
    const newNeurons: Neuron[] = []
    const newConnections: Connection[] = []

    // Create neurons
    NETWORK_CONFIG.layers.forEach((layerSize, layerIndex) => {
      const layerHeight = (layerSize - 1) * NETWORK_CONFIG.neuronSpacing

      for (let i = 0; i < layerSize; i++) {
        const neuronId = `${layerIndex}-${i}`
        newNeurons.push({
          id: neuronId,
          x: 80 + layerIndex * NETWORK_CONFIG.layerSpacing,
          y: 200 + i * NETWORK_CONFIG.neuronSpacing - layerHeight / 2,
          layer: layerIndex,
          index: i,
        })

        // Create connections to next layer
        if (layerIndex < NETWORK_CONFIG.layers.length - 1) {
          const nextLayerSize = NETWORK_CONFIG.layers[layerIndex + 1]
          for (let j = 0; j < nextLayerSize; j++) {
            newConnections.push({
              id: `${neuronId}-${layerIndex + 1}-${j}`,
              from: neuronId,
              to: `${layerIndex + 1}-${j}`,
              weight: Math.random(),
            })
          }
        }
      }
    })

    setNeurons(newNeurons)
    setConnections(newConnections)
  }, [])

  // Get coordinates for connection path
  const getConnectionPath = (from: Neuron, to: Neuron) => {
    const dx = to.x - from.x
    const controlPointOffset = dx / 2
    return `M ${from.x} ${from.y} C ${from.x + controlPointOffset} ${from.y}, ${to.x - controlPointOffset} ${to.y}, ${to.x} ${to.y}`
  }

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-20" />

      <svg className="h-full w-full">
        {/* Connections */}
        <g>
          {connections.map((conn) => {
            const fromNeuron = neurons.find((n) => n.id === conn.from)
            const toNeuron = neurons.find((n) => n.id === conn.to)
            if (!fromNeuron || !toNeuron) return null

            const isHighlighted =
              hoveredNeuron === conn.from || hoveredNeuron === conn.to

            return (
              <motion.path
                key={conn.id}
                d={getConnectionPath(fromNeuron, toNeuron)}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: isHighlighted ? 0.8 : 0.2,
                  stroke: isHighlighted ? '#60A5FA' : '#94A3B8',
                }}
                transition={{
                  duration: 1,
                  pathLength: { type: 'spring', bounce: 0 },
                }}
                className="fill-none stroke-2"
              />
            )
          })}
        </g>

        {/* Neurons */}
        <g>
          {neurons.map((neuron) => (
            <g key={neuron.id}>
              {/* Neuron Glow */}
              <motion.circle
                cx={neuron.x}
                cy={neuron.y}
                r={NETWORK_CONFIG.neuronRadius + 8}
                initial={{ scale: 0 }}
                animate={{
                  scale: hoveredNeuron === neuron.id ? 1 : 0,
                  fill: `url(#${hoveredNeuron === neuron.id ? 'neuronGlowActive' : 'neuronGlow'})`,
                }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="opacity-75"
              />

              {/* Neuron Core */}
              <motion.circle
                cx={neuron.x}
                cy={neuron.y}
                r={NETWORK_CONFIG.neuronRadius}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  fill:
                    hoveredNeuron === neuron.id
                      ? 'url(#neuronGradientActive)'
                      : 'url(#neuronGradient)',
                }}
                whileHover={{ scale: 1.15 }}
                onHoverStart={() => setHoveredNeuron(neuron.id)}
                onHoverEnd={() => setHoveredNeuron(null)}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="cursor-pointer"
              />
            </g>
          ))}
        </g>

        {/* Gradients */}
        <defs>
          {/* Regular Neuron Gradient */}
          <radialGradient id="neuronGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </radialGradient>

          {/* Active Neuron Gradient */}
          <radialGradient id="neuronGradientActive" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#60A5FA" />
          </radialGradient>

          {/* Glow Effects */}
          <radialGradient id="neuronGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(96, 165, 250, 0.3)" />
            <stop offset="100%" stopColor="rgba(96, 165, 250, 0)" />
          </radialGradient>

          <radialGradient id="neuronGlowActive" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.4)" />
            <stop offset="100%" stopColor="rgba(147, 197, 253, 0)" />
          </radialGradient>
        </defs>
      </svg>

      {/* Layer Labels */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-16 text-sm font-medium text-gray-400">
        <span>Input Layer</span>
        <span>Hidden Layer 1</span>
        <span>Hidden Layer 2</span>
        <span>Output Layer</span>
      </div>
    </div>
  )
}

export default NeuralNetworkViz
