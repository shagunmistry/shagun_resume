'use client'
import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const ActivationFunctionsViz = () => {
  const [selectedFunction, setSelectedFunction] =
    useState<ActivationFunction>('relu')

  // Generate data points for x-axis from -5 to 5
  interface DataPoint {
    x: number
    y: number
  }

  type ActivationFunction = 'relu' | 'sigmoid' | 'tanh' | 'leakyRelu'

  const generateData = (activationFunc: ActivationFunction): DataPoint[] => {
    const data: DataPoint[] = []
    for (let x = -5; x <= 5; x += 0.2) {
      let y: number
      switch (activationFunc) {
        case 'relu':
          y = Math.max(0, x)
          break
        case 'sigmoid':
          y = 1 / (1 + Math.exp(-x))
          break
        case 'tanh':
          y = Math.tanh(x)
          break
        case 'leakyRelu':
          y = x > 0 ? x : 0.1 * x
          break
        default:
          y = Math.max(0, x)
      }
      data.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(4)) })
    }
    return data
  }

  const activationFunctions = {
    relu: { name: 'ReLU', color: '#2563eb' },
    sigmoid: { name: 'Sigmoid', color: '#dc2626' },
    tanh: { name: 'Tanh', color: '#16a34a' },
    leakyRelu: { name: 'Leaky ReLU', color: '#9333ea' },
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Activation Functions Visualizer
      </h2>

      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(activationFunctions).map(([key, { name, color }]) => (
          <button
            key={key}
            onClick={() => setSelectedFunction(key as ActivationFunction)}
            className={`rounded-lg px-4 py-2 font-medium transition-colors
              ${
                selectedFunction === key
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={generateData(selectedFunction)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="x"
              domain={[-5, 5]}
              type="number"
              tickCount={11}
              label={{ value: 'x', position: 'bottom', offset: 0 }}
            />
            <YAxis
              domain={selectedFunction === 'sigmoid' ? [0, 1] : [-2, 2]}
              tickCount={9}
              label={{ value: 'f(x)', angle: -90, position: 'left' }}
            />
            <Tooltip
              formatter={(value) => [value, 'f(x)']}
              labelFormatter={(value) => `x: ${value}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="y"
              stroke={activationFunctions[selectedFunction].color}
              name={activationFunctions[selectedFunction].name}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold text-gray-700">
          {activationFunctions[selectedFunction].name} Properties:
        </h3>
        <ul className="space-y-1 text-gray-600">
          {selectedFunction === 'relu' && (
            <>
              <li>• Range: [0, ∞)</li>
              <li>• No vanishing gradient for positive values</li>
              <li>• Computationally efficient</li>
              <li>• Most commonly used in hidden layers</li>
            </>
          )}
          {selectedFunction === 'sigmoid' && (
            <>
              <li>• Range: (0, 1)</li>
              <li>• Smooth and differentiable</li>
              <li>• Suitable for binary classification</li>
              <li>• Can suffer from vanishing gradients</li>
            </>
          )}
          {selectedFunction === 'tanh' && (
            <>
              <li>• Range: (-1, 1)</li>
              <li>• Zero-centered outputs</li>
              <li>• Stronger gradients than sigmoid</li>
              <li>• Used in sequence modeling</li>
            </>
          )}
          {selectedFunction === 'leakyRelu' && (
            <>
              <li>• Range: (-∞, ∞)</li>
              <li>• Prevents "dying ReLU" problem</li>
              <li>• Small negative slope (α=0.1)</li>
              <li>• Better gradient flow</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ActivationFunctionsViz
