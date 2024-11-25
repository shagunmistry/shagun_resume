'use client'
import React from 'react'
import { Card } from '@/components/Card'
import { motion } from 'motion/react'
import WasteDataSources from '@/components/climate-podcast/WasteDataSources'

import Intro from './intro.mdx'
import { Prose } from '@/components/Prose'

const categories = [
  {
    category: 'Scientific Organizations',
    icon: '🔬',
    sources: [
      {
        name: 'NASA Global Climate Change',
        focus: 'Temperature data, sea levels, CO2',
        updateFrequency: 'Monthly',
        dataType: 'Raw data + Visualizations',
      },
      {
        name: 'NOAA Climate.gov',
        focus: 'Weather patterns, ocean data',
        updateFrequency: 'Weekly',
        dataType: 'Interactive maps + Datasets',
      },
      {
        name: 'IPCC Reports',
        focus: 'Comprehensive climate assessments',
        updateFrequency: 'Major reports every 5-7 years',
        dataType: 'Scientific consensus + Projections',
      },
    ],
  },
  {
    category: 'Real-Time Monitoring',
    icon: '🌍',
    sources: [
      {
        name: 'Global Carbon Project',
        focus: 'Carbon emissions tracking',
        updateFrequency: 'Annual + Real-time estimates',
        dataType: 'Emissions data + Trends',
      },
      {
        name: 'Climate Action Tracker',
        focus: 'Country climate policies',
        updateFrequency: 'Quarterly',
        dataType: 'Policy analysis + Ratings',
      },
      {
        name: 'World Resources Institute',
        focus: 'Resource use and climate impacts',
        updateFrequency: 'Varies by dataset',
        dataType: 'Interactive tools + Reports',
      },
    ],
  },
  {
    category: 'Industry Analysis',
    icon: '💼',
    sources: [
      {
        name: 'BloombergNEF',
        focus: 'Clean energy, transport, industry',
        updateFrequency: 'Daily updates',
        dataType: 'Market data + Forecasts',
      },
      {
        name: 'Carbon Brief',
        focus: 'Climate science and policy',
        updateFrequency: 'Daily',
        dataType: 'Analysis + Interactive tools',
      },
      {
        name: 'CDP',
        focus: 'Corporate environmental impact',
        updateFrequency: 'Annual reports',
        dataType: 'Company disclosures + Analysis',
      },
    ],
  },
]
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
}

export default function DataSources() {
  return (
    <>
      <Prose>
        <Intro />
      </Prose>
      <Card className="mx-auto mt-8 w-full max-w-4xl">
        <div className="space-y-6 p-6">
          <div className="text-center">
            <Card.Title as="h1">Climate Change Data Sources</Card.Title>
            <Card.Description>
              Comprehensive resources for climate change podcast research
            </Card.Description>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white/50 backdrop-blur transition-colors dark:border-gray-700/50 dark:bg-gray-800/50"
              >
                <div className="border-b border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700/50 dark:bg-gray-700/50">
                  <h3 className="flex items-center text-lg font-bold text-gray-900 dark:text-white">
                    <span className="mr-2">{cat.icon}</span>
                    {cat.category}
                  </h3>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cat.sources.map((source, i) => (
                    <div
                      key={i}
                      className="group relative p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />

                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {source.name}
                      </h4>

                      <div className="mt-2 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                        <div className="space-y-1">
                          <span className="font-medium text-purple-600 dark:text-purple-400">
                            Focus
                          </span>
                          <p className="text-gray-600 dark:text-gray-300">
                            {source.focus}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="font-medium text-purple-600 dark:text-purple-400">
                            Updates
                          </span>
                          <p className="text-gray-600 dark:text-gray-300">
                            {source.updateFrequency}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="font-medium text-purple-600 dark:text-purple-400">
                            Type
                          </span>
                          <p className="text-gray-600 dark:text-gray-300">
                            {source.dataType}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Card>

      <WasteDataSources />
    </>
  )
}
