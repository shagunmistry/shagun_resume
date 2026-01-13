'use client'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { motion } from 'motion/react'

const tools = [
  {
    name: 'Fixed-Length File Parser',
    description:
      'Parse fixed-length text files with ease. Define your field layout and visualize your data in a structured format.',
    link: { href: '/tools/fixed-length-file-parser', label: 'Use Parser' },
    icon: '=�',
    gradient: 'from-blue-400 via-blue-500 to-purple-600',
  },
  {
    name: 'On-Call Schedule Creator',
    description:
      'Generate perfect on-call schedules for your team. Create rotation schedules with custom frequencies and export to Excel or calendar apps.',
    link: { href: '/tools/on-call-scheduler', label: 'Create Schedule' },
    icon: '📅',
    gradient: 'from-pink-400 via-purple-500 to-indigo-600',
  },
  {
    name: 'Vegan Macro Calculator',
    description:
      'Calculate personalized macronutrient targets for plant-based nutrition. Get vegan-specific recommendations with food suggestions and nutritional tips.',
    link: { href: '/tools/vegan-macro-calculator', label: 'Calculate Macros' },
    icon: '🌱',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
  },
  {
    name: 'Log Viewer',
    description:
      'Analyze and filter application logs with ease. Search, filter by level, and navigate through logs with keyboard shortcuts and pagination.',
    link: { href: '/tools/log-viewer', label: 'View Logs' },
    icon: '📋',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
  },
]

const ToolCard = ({ tool }: { tool: (typeof tools)[0] }) => (
  <motion.div whileHover={{ y: -5 }} className="group relative">
    <div
      className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-75 blur-lg transition-all duration-300 group-hover:opacity-100"
      style={{
        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
      }}
    />
    <Card
      as="div"
      className="relative h-full overflow-hidden rounded-2xl border-0 bg-white/10 backdrop-blur-md dark:bg-gray-900/50"
    >
      <div className="relative z-10 p-6">
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 shadow-lg backdrop-blur-md dark:from-gray-800/10 dark:to-gray-800/5">
          <span className="text-2xl">{tool.icon}</span>
        </div>
        <h2 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-base font-semibold text-transparent dark:from-white dark:to-gray-400">
          {tool.name}
        </h2>
        <Card.Description>{tool.description}</Card.Description>
        <a href={tool.link.href} className="block">
          <div className="relative z-10 mt-6 flex text-sm font-medium text-teal-500 transition group-hover:text-teal-600 dark:text-teal-400 dark:group-hover:text-teal-300">
            <span>{tool.link.label}</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="ml-1 h-4 w-4 stroke-current"
            >
              <path
                d="M6.75 5.75 9.25 8l-2.5 2.25"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>
      </div>
    </Card>
  </motion.div>
)

export default function Tools() {
  return (
    <SimpleLayout
      title="Tools"
      intro="A collection of free tools designed to help with various data and development tasks."
    >
      <div className="space-y-16">
        <section>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </SimpleLayout>
  )
}
