'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'motion/react'
import { Sun, Moon, ArrowLeft } from 'lucide-react'
import { getMainSiteUrl } from '@/lib/subdomain'

// Apple-inspired gradient backgrounds
const gradients = {
  light: {
    background: 'bg-gradient-to-b from-white/80 to-white/60',
    blur: 'backdrop-blur-xl',
    border: 'border-white/20',
  },
  dark: {
    background: 'bg-gradient-to-b from-gray-900/90 to-gray-900/70',
    blur: 'backdrop-blur-xl',
    border: 'border-white/10',
  },
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

interface ToolHeaderProps {
  toolName?: string
}

export function ToolHeader({ toolName = 'Tool' }: ToolHeaderProps) {
  const { resolvedTheme } = useTheme()
  const activeGradient =
    resolvedTheme === 'dark' ? gradients.dark : gradients.light
  const mainSiteUrl = getMainSiteUrl()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-50 ${activeGradient.background} ${activeGradient.blur} ${activeGradient.border} border-b`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Tool Name */}
          <div className="flex items-center space-x-4">
            <motion.h1
              whileHover={{ scale: 1.02 }}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              {toolName}
            </motion.h1>
          </div>

          {/* Right side: Back link and Theme toggle */}
          <div className="flex items-center space-x-4">
            {/* Back to main site */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={mainSiteUrl}
                className="flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-purple-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-purple-400"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to main site</span>
              </Link>
            </motion.div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
