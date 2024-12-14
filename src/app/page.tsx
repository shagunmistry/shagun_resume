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
  DownloadResumeIcon,
  PodcastIcon,
} from '@/components/SocialIcons'
import { Resume } from '@/components/Resume'
import Newsletter from '@/components/Newsletter'
import PodcastFeed from '@/components/PodcastFeed'

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
  <div className="relative">
    {/* Background blur effect */}
    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-3xl" />

    {/* Text content */}
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.span
        className="absolute -inset-8 block text-center text-7xl font-bold opacity-5 blur-2xl"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Shagun Mistry
      </motion.span>

      <motion.h1
        className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent sm:text-7xl"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Shagun Mistry
      </motion.h1>
    </motion.div>
  </div>
)

const SubTitle = () => (
  <div className="relative mt-8">
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-transparent to-indigo-100/50 blur-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />

    <motion.div
      className="relative grid gap-4 text-center text-lg font-medium"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
    >
      <span className="text-purple-950/80 dark:text-purple-200/90">
        Software Developer, Machine Learning Enthusiast
      </span>
      <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
        Cinema Lover, and an Avid Reader
      </span>
    </motion.div>
  </div>
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
    <div className="min-h-screen w-full">
      <ScrollProgress />

      {/* Hero Section */}
      <section className="px-4 pt-16 sm:pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <Name />
          <SubTitle />

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-2xl"
          >
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <SocialLink
                href="https://twitter.com/mistry_shagun"
                aria-label="Follow on X"
                icon={XIcon}
                className="transform transition-transform hover:scale-110"
              />
              <SocialLink
                href="https://www.instagram.com/shazzamm_/"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
                className="transform transition-transform hover:scale-110"
              />
              <SocialLink
                href="https://github.com/shagunmistry"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
                className="transform transition-transform hover:scale-110"
              />
              <SocialLink
                href="https://www.linkedin.com/in/shagun-mistry/"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
                className="transform transition-transform hover:scale-110"
              />
              <SocialLink
                href="https://open.spotify.com/show/1XlC0keK5SfJCEX4siyBZf"
                aria-label="The Money Planet Podcast"
                icon={PodcastIcon}
                className="transform transition-transform hover:scale-110"
              />
              <SocialLink
                href="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Shagun%20Mistry%20Resume.pdf?alt=media&token=77caa21f-7bbd-4d42-bbda-08d7180bfc67"
                aria-label="Download Resume"
                icon={DownloadResumeIcon}
                className="transform transition-transform hover:scale-110"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto max-w-7xl"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Podcast Feed */}
            <div className="lg:col-span-7 lg:border-r lg:border-purple-100/20 lg:pr-8">
              <PodcastFeed />
            </div>

            {/* Newsletter and Resume */}
            <div className="space-y-8 lg:col-span-5 lg:pl-8">
              <Newsletter />
              <Resume />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
