'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'

const podcastNavItems = [
  {
    title: 'Overview',
    href: '/projects/climate-change-podcast',
  },
  {
    title: 'Name Analysis',
    href: '/projects/climate-change-podcast/podcast-name-analysis',
  },
  {
    title: 'Useful Diagrams',
    href: '/projects/climate-change-podcast/useful-diagrams',
  },
  {
    title: 'Growth Plan',
    href: '/projects/climate-change-podcast/growth-plan',
  },
]

export function PodcastNavigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-16 z-10 mb-8 w-full">
      <div className="mx-auto max-w-4xl rounded-xl bg-white/50 p-2 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur dark:bg-slate-900/50 dark:ring-white/10">
        <ul className="flex flex-wrap items-center gap-2 text-sm font-medium">
          {podcastNavItems.map((item, index) => {
            const isActive = pathname === item.href
            const isFirst = index === 0

            return (
              <li key={item.href} className="flex items-center">
                {!isFirst && (
                  <ChevronRight className="mx-2 h-4 w-4 text-slate-400 dark:text-slate-600" />
                )}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={`relative rounded-lg px-3 py-2 transition ${
                      isActive
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 -z-10 rounded-lg bg-purple-50 dark:bg-purple-900/50"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {item.title}
                  </Link>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
