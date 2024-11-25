'use client'

import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ComponentProps, ElementType, ReactNode } from 'react'

// Apple-inspired animation variants
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
  },
}

const glassEffect = {
  light: {
    background: 'bg-gradient-to-br from-white/80 via-white/70 to-white/50',
    border: 'border-white/20',
    shadow: 'shadow-lg shadow-purple-500/10',
    blur: 'backdrop-blur-xl',
  },
  dark: {
    background:
      'bg-gradient-to-br from-purple-900/80 via-purple-900/70 to-purple-900/50',
    border: 'border-white/10',
    shadow: 'shadow-lg shadow-purple-500/20',
    blur: 'backdrop-blur-xl',
  },
}

interface CardProps<T extends ElementType> {
  as?: T
  className?: string
  children: ReactNode
}

function CardComponent<T extends ElementType = 'div'>({
  as,
  className,
  children,
}: CardProps<T>) {
  const Component = as ?? 'div'
  const { resolvedTheme } = useTheme()
  const effect = resolvedTheme === 'dark' ? glassEffect.dark : glassEffect.light

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className={`group relative ${effect.background} ${effect.border} ${effect.shadow} ${effect.blur} 
        rounded-2xl border p-6 transition-all duration-300 ${className}`}
    >
      <Component className="relative flex flex-col items-start">
        {children}
      </Component>
    </motion.div>
  )
}

function CardLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <motion.div className="relative w-full">
      <motion.div
        className="absolute inset-0 -z-10 rounded-xl bg-purple-100/50 opacity-0 
          transition-all duration-300 group-hover:opacity-100 dark:bg-purple-700/30"
        initial={false}
        animate={{
          scale: [0.95, 1],
          opacity: [0, 1],
        }}
        transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      />
      <Link {...props} className="block">
        <motion.span
          className="relative z-10 block"
          whileHover={{ x: 4 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        >
          {children}
        </motion.span>
      </Link>
    </motion.div>
  )
}

interface CardTitleProps<T extends ElementType> {
  as?: T
  href?: string
  children: ReactNode
}

function CardTitle<T extends ElementType = 'h2'>({
  as,
  href,
  children,
}: CardTitleProps<T>) {
  const Component = as ?? 'h2'

  return (
    <Component className="text-base font-semibold tracking-tight">
      {href ? (
        <CardLink href={href}>
          <motion.span
            className="bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text 
              text-transparent dark:from-yellow-200 dark:to-yellow-100"
          >
            {children}
          </motion.span>
        </CardLink>
      ) : (
        <motion.span
          className="bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text 
            text-transparent dark:from-yellow-200 dark:to-yellow-100"
        >
          {children}
        </motion.span>
      )}
    </Component>
  )
}

function CardDescription({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-md relative z-10 mt-2 text-purple-600 dark:text-yellow-400/90"
    >
      {children}
    </motion.p>
  )
}

function CardCta({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="relative z-10 mt-4 flex items-center text-sm font-medium"
    >
      <motion.span className="bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent">
        {children}
      </motion.span>
      <motion.div
        whileHover={{ x: 2 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      >
        <ChevronRight className="ml-1 h-4 w-4 stroke-teal-500" />
      </motion.div>
    </motion.div>
  )
}

interface CardEyebrowProps<T extends ElementType> {
  as?: T
  decorate?: boolean
  className?: string
  children: ReactNode
}

function CardEyebrow<T extends ElementType = 'p'>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: CardEyebrowProps<T>) {
  const Component = as ?? 'p'

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <Component
        className={`relative z-10 order-first mb-3 flex items-center text-sm 
          text-purple-400 dark:text-purple-500 ${decorate ? 'pl-3.5' : ''} ${className}`}
        {...props}
      >
        {decorate && (
          <motion.span
            className="absolute inset-y-0 left-0 flex items-center"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.2 }}
            aria-hidden="true"
          >
            <motion.span
              className="h-4 w-0.5 rounded-full bg-gradient-to-b from-purple-400 to-purple-300 
                dark:from-purple-500 dark:to-purple-400"
              whileHover={{ scaleY: 1.2 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            />
          </motion.span>
        )}
        {children}
      </Component>
    </motion.div>
  )
}

export const Card = Object.assign(CardComponent, {
  Link: CardLink,
  Title: CardTitle,
  Description: CardDescription,
  Cta: CardCta,
  Eyebrow: CardEyebrow,
})
