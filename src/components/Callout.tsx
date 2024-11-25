'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { AlertCircle, Info, Lightbulb, Rocket } from 'lucide-react'

// Callout types and their properties
const calloutTypes = {
  alert: {
    icon: AlertCircle,
    className:
      'bg-red-50 border-red-900/10 dark:bg-red-900/30 dark:border-red-500/30',
    iconClassName: 'text-red-500 dark:text-red-400',
  },
  info: {
    icon: Info,
    className:
      'bg-blue-50 border-blue-900/10 dark:bg-blue-900/30 dark:border-blue-500/30',
    iconClassName: 'text-blue-500 dark:text-blue-400',
  },
  insight: {
    icon: Lightbulb,
    className:
      'bg-yellow-50 border-yellow-900/10 dark:bg-yellow-900/30 dark:border-yellow-500/30',
    iconClassName: 'text-yellow-500 dark:text-yellow-400',
  },
  motivation: {
    icon: Rocket,
    className:
      'bg-purple-50 border-purple-900/10 dark:bg-purple-900/30 dark:border-purple-500/30',
    iconClassName: 'text-purple-500 dark:text-purple-400',
  },
}

interface CalloutProps {
  type?: keyof typeof calloutTypes
  children: React.ReactNode
  className?: string
}

export default function Callout({ type = 'info', children, className }: CalloutProps) {
  const {
    icon: Icon,
    className: defaultClassName,
    iconClassName,
  } = calloutTypes[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        'my-6 flex gap-4 rounded-2xl border p-6',
        defaultClassName,
        className,
      )}
    >
      <Icon className={clsx('h-5 w-5 flex-none', iconClassName)} />
      <div className="prose-sm [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </motion.div>
  )
}


