'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Card } from '@/components/Card'
import { MermaidDiagram } from '@/components/MermaidDiagram'
import { ChevronDown, Radio, Target, BarChart2 } from 'lucide-react'

// Your diagram strings
const mindmapDiagram = `mindmap
  root((Climate + Trending))
    Personal Finance
        Green Investment Opportunities
            Clean Energy Stocks
            ESG Funds Growth
            Carbon Credit Trading
        Cost Savings through Sustainability
            Energy Efficiency ROI
            Tax Incentives
            Reduced Bills
        Future-Proof Your Portfolio
            Climate Risk Management
            Green Real Estate Value
            Sustainable Business Models
    Entrepreneurship
        Green Business Opportunities
            Climate Tech Startups
            Sustainable Products
            Circular Economy Models
        Innovation & Market Trends
            emerging Technologies
            Consumer Behavior Shifts
            Industry Disruption
        Funding Landscape
            Green VC Focus
            Government Grants
            Impact Investment
    Career Development
        Green Jobs Growth
            Emerging Roles
            Salary Trends
            Skills in Demand
        Future-Proof Skills
            Sustainability Certifications
            Technical Expertise
            Green Management
        Industry Transitions
            Traditional to Green
            Reskilling Opportunities
            Career Pivots
    Lifestyle & Wellness
        Sustainable Living Benefits
            Health Improvements
            Cost Reduction
            Quality of Life
        Minimalism & Efficiency
            Decluttering Benefits
            Resource Optimization
            Time Management
        Personal Brand Building
            Social Impact
            Professional Growth
            Network Effects`

const strategyDiagram = `graph TD
    A[Content Strategy] --> B[Lead with Benefits]
    A --> C[Use Success Stories]
    A --> D[Action-Oriented Format]
    A --> E[Solution Focus]

    B --> B1[Financial gains]
    B --> B2[Career growth]
    B --> B3[Lifestyle improvement]
    B --> B4[Health benefits]

    C --> C1[Entrepreneur success]
    C --> C2[Personal transformations]
    C --> C3[Community wins]
    C --> C4[Investment returns]

    D --> D1[Step-by-step guides]
    D --> D2[Quick wins first]
    D --> D3[Measurable outcomes]
    D --> D4[Resource toolkits]

    E --> E1[Practical solutions]
    E --> E2[Innovation spotlight]
    E --> E3[Market opportunities]
    E --> E4[Personal empowerment]

    style A fill:#f9f,stroke:#333,stroke-width:4px
    style B,C,D,E fill:#bbf,stroke:#333,stroke-width:2px`

interface Tab {
  id: string
  label: string
  icon: React.ReactNode
  description: string
  diagram: string
}

const tabs: Tab[] = [
  {
    id: 'content-map',
    label: 'Content Map',
    icon: <Radio className="h-5 w-5" />,
    description:
      'Exploring the intersection of climate change with trending topics',
    diagram: mindmapDiagram,
  },
  {
    id: 'strategy',
    label: 'Strategy Framework',
    icon: <Target className="h-5 w-5" />,
    description: 'Core principles and approach for content creation',
    diagram: strategyDiagram,
  },
]

export default function PodcastStrategy() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 pb-20 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="mb-12 pt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl dark:from-purple-400 dark:to-indigo-400">
              Content Strategy
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Making climate change relatable through innovative content
              approaches
            </p>
          </motion.div>

          {/* Metrics Section */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <MetricCard
              icon={<BarChart2 className="h-6 w-6" />}
              title="4 Main Topics"
              description="Finance, Business, Career, Lifestyle"
            />
            <MetricCard
              icon={<Radio className="h-6 w-6" />}
              title="12+ Subtopics"
              description="Detailed content areas"
            />
            <MetricCard
              icon={<Target className="h-6 w-6" />}
              title="48+ Episodes"
              description="Planned content pieces"
            />
          </motion.div> */}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-lg dark:bg-gray-800 dark:text-purple-400'
                    : 'text-gray-600 hover:bg-white/50 dark:text-gray-400 dark:hover:bg-gray-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700/50 dark:bg-gray-800/50">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {tab.label}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {tab.description}
                      </p>
                    </div>
                  </Card>
                  <div className="p-1">
                    <MermaidDiagram
                      diagram={tab.diagram}
                      className="h-[400px] w-full"
                    />
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/50 p-6 backdrop-blur transition-all hover:bg-white/80 dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:bg-gray-800/80">
      <div className="mb-3 inline-flex rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  )
}
