'use client'
import Link from 'next/link'
import { motion, useScroll } from 'motion/react'

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

// Refined social link component with subtle animation
function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Link
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700"
        {...props}
      >
        <Icon className="h-4 w-4 fill-zinc-600 transition group-hover:fill-zinc-900 dark:fill-zinc-400 dark:group-hover:fill-zinc-100" />
      </Link>
    </motion.div>
  )
}

// Elegant name component
const Name = () => (
  <motion.div
    className="relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <motion.h1
      className="text-center text-4xl font-light tracking-widest text-zinc-900 sm:text-5xl dark:text-zinc-100"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      SHAGUN MISTRY
    </motion.h1>
  </motion.div>
)

// Refined subtitle with minimalist styling
const SubTitle = () => (
  <motion.div
    className="mt-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
  >
    <p className="text-center text-sm font-light uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
      Software Developer · Machine Learning · Cinema · Literature
    </p>
  </motion.div>
)

// Subtle scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 h-px origin-left transform bg-zinc-900 dark:bg-zinc-100"
      style={{ scaleX: scrollYProgress, opacity: 0.3 }}
    />
  )
}

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-900">
      <ScrollProgress />

      {/* Hero Section with more whitespace */}
      <section className="px-4 pt-32 sm:pt-40 md:pt-48">
        <div className="mx-auto max-w-2xl">
          <Name />
          <SubTitle />

          {/* Social Links with refined spacing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mt-12 flex justify-center space-x-5">
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
              <SocialLink
                href="https://open.spotify.com/show/1XlC0keK5SfJCEX4siyBZf"
                aria-label="The Money Planet Podcast"
                icon={PodcastIcon}
              />
              <SocialLink
                href="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Shagun%20Mistry%20Resume.pdf?alt=media&token=77caa21f-7bbd-4d42-bbda-08d7180bfc67"
                aria-label="Download Resume"
                icon={DownloadResumeIcon}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section with elegant spacing */}
      <section className="px-4 py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Podcast Feed */}
            <div className="lg:col-span-7 lg:border-r lg:border-zinc-200 lg:pr-16 dark:lg:border-zinc-800">
              <div className="mb-8">
                <h2 className="text-xl font-light tracking-wider text-zinc-900 dark:text-zinc-100">
                  PODCAST
                </h2>
                <div className="mt-2 h-px w-8 bg-zinc-400 dark:bg-zinc-600"></div>
              </div>
              <PodcastFeed />
            </div>

            {/* Newsletter and Resume */}
            <div className="space-y-16 lg:col-span-5 lg:pl-16">
              <div>
                <h2 className="text-xl font-light tracking-wider text-zinc-900 dark:text-zinc-100">
                  NEWSLETTER
                </h2>
                <div className="mt-2 h-px w-8 bg-zinc-400 dark:bg-zinc-600"></div>
                <div className="mt-8">
                  <Newsletter />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-light tracking-wider text-zinc-900 dark:text-zinc-100">
                  EXPERIENCE
                </h2>
                <div className="mt-2 h-px w-8 bg-zinc-400 dark:bg-zinc-600"></div>
                <div className="mt-8">
                  <Resume />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
