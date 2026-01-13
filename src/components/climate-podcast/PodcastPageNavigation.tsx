'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useState } from 'react'
import { Home, Book, PieChart, TrendingUp, BarChart } from 'lucide-react'

const podcastNavItems = [
  {
    title: 'Overview',
    href: '/projects/climate-change-podcast',
    icon: Home,
    gradient: 'from-blue-400 to-blue-600',
    hoverGradient: 'from-blue-500 to-blue-700',
  },
  {
    title: 'Episodes',
    href: '/projects/climate-change-podcast/episodes',
    icon: Book,
    gradient: 'from-purple-400 to-purple-600',
    hoverGradient: 'from-purple-500 to-purple-700',
  },

  {
    title: 'Useful Diagrams',
    href: '/projects/climate-change-podcast/useful-diagrams',
    icon: PieChart,
    gradient: 'from-indigo-400 to-indigo-600',
    hoverGradient: 'from-indigo-500 to-indigo-700',
  },
  {
    title: 'Growth Plan',
    href: '/projects/climate-change-podcast/growth-plan',
    icon: TrendingUp,
    gradient: 'from-cyan-400 to-cyan-600',
    hoverGradient: 'from-cyan-500 to-cyan-700',
  },
  {
    title: 'EU Statistics',
    href: '/projects/climate-change-podcast/european-union-eurostats-analysis',
    icon: BarChart,
    gradient: 'from-teal-400 to-teal-600',
    hoverGradient: 'from-teal-500 to-teal-700',
  },
]

const NavigationItem = ({
  item,
  isActive,
}: {
  item: any
  isActive: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon

  return (
    <motion.div
      className="relative w-full"
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={item.href}>
        <div
          className={`
            relative
            rounded-2xl
            p-3
            transition-all
            duration-300
            ${isActive ? 'scale-100' : 'scale-95 opacity-80 hover:opacity-100'}
          `}
        >
          {/* Background with gradient */}
          <div
            className={`
              absolute
              inset-0
              rounded-2xl
              bg-gradient-to-r
              ${isActive || isHovered ? item.hoverGradient : item.gradient}
              opacity-90
              transition-all
              duration-300
              ${isActive ? 'blur-[4px]' : 'blur-none'}
            `}
          />

          {/* Glass effect overlay */}
          <div
            className={`
              absolute
              inset-0
              rounded-2xl
              backdrop-blur-md
              transition-opacity
              duration-300
              ${isActive ? 'opacity-20' : 'opacity-10'}
            `}
          />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-3 px-3 py-2">
            <Icon className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white">{item.title}</span>
          </div>

          {/* Active indicator shine */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              animate={{
                opacity: [0, 0.1, 0],
                backgroundPosition: ['0% 50%', '200% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export function PodcastNavigation() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-4 top-24 z-10 h-[calc(100vh-8rem)] w-64"
    >
      <div className="h-full rounded-3xl bg-white/10 p-4 shadow-lg shadow-black/5 backdrop-blur-xl dark:bg-gray-800/10">
        <div className="space-y-2">
          {podcastNavItems.map((item) => (
            <NavigationItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
