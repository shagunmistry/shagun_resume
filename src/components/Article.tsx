'use client'

import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { useState } from 'react'
import Link from 'next/link'
import { ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

const MotionLink = motion(Link)

function Article({ article }: { article: ArticleWithSlug }) {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: {
    currentTarget: HTMLElement
    clientX: number
    clientY: number
  }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(147, 51, 234, 0.08),
      transparent 80%
    )
  `

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        type: 'spring',
        stiffness: 100,
      }}
      onMouseMove={onMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-3xl border border-purple-200/30 bg-gradient-to-b from-white/80 to-white/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:from-purple-950/20 dark:to-purple-900/10"
    >
      {/* Hover gradient effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
        aria-hidden="true"
      />

      {/* Title with animated underline */}
      <MotionLink
        href={`/articles/${article.slug}`}
        className="relative block"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <motion.h2 className="text-xl font-semibold tracking-tight text-purple-900 dark:text-purple-100">
          {article.title}
          <motion.span
            className="absolute -bottom-px left-0 inline-block h-[2px] w-0 bg-gradient-to-r from-purple-400/40 via-purple-500/40 to-transparent"
            animate={{
              width: isHovered ? '100%' : '0%',
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </motion.h2>
      </MotionLink>

      {/* Date with shimmer effect */}
      <motion.time
        dateTime={article.date}
        className="relative mt-2 flex items-center text-sm text-purple-600/80 dark:text-purple-400/80"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.span
          className="absolute left-0 h-[2px] w-2 bg-purple-400/60"
          initial={{ width: '8px' }}
          animate={{ width: isHovered ? '16px' : '8px' }}
          transition={{ duration: 0.2 }}
        />
        <span className="ml-4">{formatDate(article.date)}</span>
      </motion.time>

      {/* Description with fade-in effect */}
      <motion.p
        className="mt-4 text-sm text-purple-800/70 dark:text-purple-200/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {article.description}
      </motion.p>

      {/* CTA with dynamic arrow */}
      <motion.a
        className="mt-4 flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        href={`/articles/${article.slug}`}
      >
        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
          Read article
        </span>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="stroke-current"
          animate={{
            x: isHovered ? 4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <path
            d="M6.75 3.25L11.25 8l-4.5 4.75"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.a>

      {/* Decorative corner gradient */}
      <motion.div
        className="absolute right-3 top-3 h-20 w-20 rounded-full bg-gradient-to-br from-purple-200/20 via-purple-300/10 to-transparent opacity-0 blur-2xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.article>
  )
}

// Optional: Wrap with motion.div for list animations
export function ArticlesList({ articles }: { articles: ArticleWithSlug[] }) {
  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {articles.map((article) => (
        <motion.div
          key={article.slug}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.4,
            type: 'spring',
            stiffness: 100,
          }}
        >
          <Article article={article} />
        </motion.div>
      ))}
    </motion.div>
  )
}
