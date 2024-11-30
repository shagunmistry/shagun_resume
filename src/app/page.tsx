'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useScroll } from 'motion/react'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import { Resume } from '@/components/Resume'
import Newsletter from '@/components/Newsletter'

// Smooth gradient backgrounds inspired by Apple
const GradientBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-100 opacity-80 dark:from-purple-950 dark:via-gray-900 dark:to-purple-900" />
    <motion.div
      className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF6,#6366F1)] opacity-20 dark:opacity-30"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </div>
)

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 15, stiffness: 300 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{ x, y }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-purple-200 backdrop-blur-sm transition-all duration-300 dark:ring-purple-800"
        {...props}
      >
        <Icon className="h-5 w-5 fill-purple-600 transition group-hover:fill-purple-800 dark:fill-purple-400 dark:group-hover:fill-purple-200" />
      </Link>
    </motion.div>
  )
}

const Name = () => (
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className="relative bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent sm:text-6xl dark:from-purple-400 dark:to-indigo-400"
  >
    Shagun Mistry
  </motion.h1>
)

const SubTitle = () => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
    className="mt-6 text-center text-lg font-medium text-purple-700 dark:text-purple-300"
  >
    Software Developer, Machine Learning Enthusiast,
    <br /> Cinema Lover, and an Avid Reader.
  </motion.p>
)

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 h-1 origin-left transform bg-gradient-to-r from-purple-500 to-indigo-500"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <GradientBackground />

      <Container className="mt-16 sm:mt-32">
        <Name />
        <SubTitle />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-2xl"
        >
          <div className="mt-12 flex items-center justify-center gap-8">
            <SocialLink
              href="https://twitter.com/mistry_shagun"
              aria-label="Follow on X"
              icon={XIcon}
            />
            <SocialLink
              href="https://www.instagram.com/shazzamm_/"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/shagunmistry"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/shagun-mistry/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </motion.div>
      </Container>

      <Container className="mt-24 md:mt-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2"
        >
          <div className="flex flex-col gap-16">
            {/* Articles section can be added here */}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </motion.div>
      </Container>
    </>
  )
}
