'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const quarterlyData = [
  {
    quarter: 'Q4 2023',
    revenue: 21.3,
    vehicleSales: 18.1,
    credits: 0.5,
    energy: 1.5,
    services: 1.2,
  },
  {
    quarter: 'Q1 2024',
    revenue: 23.3,
    vehicleSales: 19.2,
    credits: 0.6,
    energy: 2.0,
    services: 1.5,
  },
  {
    quarter: 'Q2 2024',
    revenue: 24.9,
    vehicleSales: 19.6,
    credits: 0.7,
    energy: 2.2,
    services: 2.4,
  },
  {
    quarter: 'Q3 2024',
    revenue: 25.2,
    vehicleSales: 18.8,
    credits: 0.739,
    energy: 2.4,
    services: 2.8,
  },
]

const revenueBreakdown = [
  { name: 'Vehicle Sales', value: 18.8, color: '#60A5FA' },
  { name: 'Energy & Storage', value: 2.4, color: '#34D399' },
  { name: 'Services', value: 2.8, color: '#A78BFA' },
  { name: 'Regulatory Credits', value: 0.739, color: '#F472B6' },
]

const ChartSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8 rounded-2xl bg-white p-6 shadow-lg"
  >
    <h3 className="mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-xl font-semibold text-transparent">
      {title}
    </h3>
    {children}
  </motion.div>
)

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
        <p className="font-semibold">{label}</p>
        {payload.map((item, index) => (
          <p key={index} style={{ color: item.color }}>
            {item.name}: ${item.value}B
          </p>
        ))}
      </div>
    )
  }
  return null
}

const TeslaCharts = () => {
  return (
    <div className="mx-auto max-w-6xl bg-gray-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
          Tesla Financial Performance
        </h2>
        <p className="text-gray-600">Q3 2024 Performance Analysis</p>
      </motion.div>

      <ChartSection title="Revenue Growth by Quarter">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={quarterlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#60A5FA"
                fillOpacity={1}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartSection>

      <ChartSection title="Revenue Breakdown Q3 2024">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueBreakdown}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {revenueBreakdown.map((entry, index) => (
                  <motion.rect
                    key={`bar-${index}`}
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    fill={entry.color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartSection>

      <ChartSection title="Revenue Streams Comparison">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={quarterlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="vehicleSales"
                stroke="#60A5FA"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="#34D399"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="services"
                stroke="#A78BFA"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="credits"
                stroke="#F472B6"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartSection>
    </div>
  )
}

export default TeslaCharts
