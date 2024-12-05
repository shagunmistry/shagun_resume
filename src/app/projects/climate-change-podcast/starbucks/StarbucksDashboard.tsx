'use client'
import React from 'react'
import { motion } from 'motion/react'
import {
  Coffee,
  Globe,
  Droplets,
  TreePine,
  DollarSign,
  Leaf,
} from 'lucide-react'
import { Card } from '@/components/Card'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const StarbucksDashboard = () => {
  const investmentData = [
    { area: 'Agroforestry', amount: 987, icon: TreePine },
    { area: 'Sustainable Packaging', amount: 230, icon: Leaf },
    { area: 'Farmer Loans', amount: 80, icon: DollarSign },
    { area: 'Community Resilience', amount: 40, icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <motion.div
        initial="initial"
        animate="animate"
        className="mx-auto max-w-6xl space-y-8"
      >
        {/* Header */}
        <motion.div variants={fadeIn} className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-400">
            Starbucks Sustainability Impact
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Environmental footprint and initiatives
          </p>
        </motion.div>

        {/* Daily Impact Stats */}
        <motion.div
          variants={fadeIn}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <Card.Title>
              <Coffee className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <span>Daily Cups</span>
            </Card.Title>
            <Card.Description>
              <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">5M+</div>
              <p className="text-gray-600 dark:text-gray-400">Disposable cups daily in US</p>
            </Card.Description>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <Card.Title>
              <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Water Usage</span>
            </Card.Title>
            <Card.Description>
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">37</div>
              <p className="text-gray-600 dark:text-gray-400">Gallons per cup of coffee</p>
            </Card.Description>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <Card.Title>
              <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span>Global Reach</span>
            </Card.Title>
            <Card.Description>
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">83</div>
              <p className="text-gray-600 dark:text-gray-400">Countries with presence</p>
            </Card.Description>
          </Card>
        </motion.div>

        {/* Investment Bars */}
        <motion.div variants={fadeIn} className="space-y-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <Card.Title>
              Sustainability Investments (Millions USD)
            </Card.Title>
            <Card.Description>
              {investmentData.map((item, index) => (
                <motion.div
                  key={item.area}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-medium dark:text-gray-100">{item.area}</span>
                    </div>
                    <span className="font-bold dark:text-gray-100">${item.amount}M</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.amount / 987) * 100}%` }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                      className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500"
                    />
                  </div>
                </motion.div>
              ))}
            </Card.Description>
          </Card>
        </motion.div>

        {/* Environmental Impact */}
        <motion.div
          variants={fadeIn}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <Card.Title>Carbon Footprint</Card.Title>
            <Card.Description>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">16,706k</div>
              <p className="text-gray-600 dark:text-gray-400">Metric tons of CO₂ emissions</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Equivalent to 3.6M passenger vehicles annually
              </p>
            </Card.Description>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <Card.Title>Sustainable Packaging</Card.Title>
            <Card.Description>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">14%</div>
              <p className="text-gray-600 dark:text-gray-400">
                Of packaging is currently sustainable
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Target: 100% by 2030</p>
            </Card.Description>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default StarbucksDashboard