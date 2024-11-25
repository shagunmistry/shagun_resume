'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MermaidDiagram } from '@/components/MermaidDiagram'

const MaterialFlowViz = ({
  initialData,
  initialTopCountries,
}: {
  initialData: any[]
  initialTopCountries: any[]
}) => {
  const [view, setView] = useState('top10')

  const generateBarChart = useCallback(() => {
    const sortedData = [...initialTopCountries].sort(
      (a, b) => b['2023'] - a['2023'],
    )
    const maxValue = Math.max(...sortedData.map((country) => country['2023']))
    const scale = 100 / maxValue // Scale to percentage for bar lengths

    let mermaidCode = 'gantt\n'
    mermaidCode += '  title Material Flow Consumption (2023)\n'
    mermaidCode += '  dateFormat X\n'
    mermaidCode += '  axisFormat %d\n'

    // Add sections for each country
    sortedData.forEach((country) => {
      const value = country['2023']
      const barLength = Math.round(value * scale)
      const formattedValue = (value / 1000).toFixed(1)
      mermaidCode += `  section ${country.country}\n`
      mermaidCode += `  ${formattedValue}M tonnes: 0, ${barLength}\n`
    })

    return mermaidCode
  }, [initialTopCountries])

  const generateTrendChart = useCallback(() => {
    let mermaidCode = 'graph LR\n'
    mermaidCode += '  title Material Flow Trends\n'

    // Create nodes for years
    const years = ['2019', '2020', '2021', '2022', '2023']

    years.forEach((year, index) => {
      if (index < years.length - 1) {
        initialTopCountries.slice(0, 5).forEach((country) => {
          const currentValue = country[year]
          const nextValue = country[years[index + 1]]
          if (currentValue && nextValue) {
            const difference = (
              ((nextValue - currentValue) / currentValue) *
              100
            ).toFixed(1)
            const color = parseFloat(difference) >= 0 ? 'green' : 'red'
            mermaidCode += `  ${year}_${country.country}[${country.country} ${(currentValue / 1000).toFixed(1)}M] -- "${difference}%" --> ${years[index + 1]}_${country.country}[${country.country} ${(nextValue / 1000).toFixed(1)}M]\n`
          }
        })
      }
    })

    return mermaidCode
  }, [initialTopCountries])

  return (
    <div className="w-full space-y-8 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Material Flow Consumption in Europe
        </h2>

        <div className="flex space-x-4">
          <button
            onClick={() => setView('top10')}
            className={`rounded px-4 py-2 ${
              view === 'top10'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            Top 10 Countries
          </button>
          <button
            onClick={() => setView('trends')}
            className={`rounded px-4 py-2 ${
              view === 'trends'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            Trends
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="h-[600px] w-full"
      >
        <MermaidDiagram
          diagram={view === 'top10' ? generateBarChart() : generateTrendChart()}
          className="h-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-gray-500 dark:text-gray-400"
      >
        Data source: Eurostat Material Flow Accounts (env_ac_mfa)
      </motion.div>
    </div>
  )
}

export default MaterialFlowViz
