'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Sun, Moon } from 'lucide-react'

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

const menuVariants = {
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1], // Apple's custom easing
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const isActive = usePathname() === href

  return (
    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={`relative px-4 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'text-purple-500 dark:text-purple-400'
            : 'text-gray-700 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400'
        }`}
      >
        {children}
        {isActive && (
          <motion.span
            layoutId="activeTab"
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-purple-500/10 via-purple-500/20 to-purple-500/10 dark:from-purple-400/10 dark:via-purple-400/20 dark:to-purple-400/10"
            initial={false}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.li>
  )
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-4 top-4 w-full max-w-xs rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Navigation
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <nav className="mt-6">
              <ul className="space-y-4">
                <NavItem href="/about">About</NavItem>
                <NavItem href="/articles">Articles</NavItem>
                <NavItem href="/projects">Projects</NavItem>
                <NavItem href="/projects/climate-change-podcast">Podcast</NavItem>
                <NavItem href="/tech">Tech</NavItem>
              </ul>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
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

function Avatar({ large = false }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-full ${
        large ? 'h-16 w-16' : 'h-10 w-10'
      }`}
    >
      <Link href="/" aria-label="Home">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Me_and_Zola.JPG?alt=media&token=75a08c15-8438-4386-b27a-22f913c60bab"
          alt="Avatar"
          width={large ? 64 : 40}
          height={large ? 64 : 40}
          className="object-cover"
          priority
        />
      </Link>
    </motion.div>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isHomePage = usePathname() === '/'
  const { resolvedTheme } = useTheme()
  const activeGradient =
    resolvedTheme === 'dark' ? gradients.dark : gradients.light

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-50 ${activeGradient.background} ${activeGradient.blur} ${activeGradient.border} border-b`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Avatar large={isHomePage} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <motion.ul className="flex space-x-8" layout>
              <NavItem href="/about">About</NavItem>
              <NavItem href="/articles">Articles</NavItem>
              <NavItem href="/projects">Projects</NavItem>
              <NavItem href="/projects/climate-change-podcast">Podcast</NavItem>
              <NavItem href="/tech">Tech</NavItem>
            </motion.ul>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(true)}
              className="rounded-full p-2 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </motion.header>
  )
}
