'use client'
import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { motion } from 'motion/react'

const projects = [
  {
    name: 'MyPodify',
    description:
      'Build better podcasts from idea to episode. Podcast planning and pre-production tools that streamline your workflow.',
    link: { href: 'https://mypodify.com', label: 'mypodify.com' },
    logo: 'https://firebasestorage.googleapis.com/v0/b/coauthor-5a141.appspot.com/o/replicate-prediction-scj8kaz915rm00cjbpbrky41km.jpg?alt=media&token=007b7f11-04d0-4057-94eb-444748842d6b',
    gradient: 'from-blue-400 via-blue-500 to-purple-600',
    category: 'Featured',
  },
  {
    name: 'The Money Planet',
    description:
      'A podcast and YouTube channel exploring the intersection of climate change, finance, and entrepreneurship with an optimistic lens focused on solutions and opportunities.',
    link: {
      href: '/projects/climate-change-podcast',
      label: 'The Money Planet',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/coauthor-5a141.appspot.com/o/The%20Money%20Planet%20Logo.jpg?alt=media&token=35649656-7bde-403a-8d83-0a1be5eeaa89',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    category: 'Featured',
  },
  {
    name: 'FlowCraft',
    description:
      'Creating diagrams and flowcharts from plain text description, using AI.',
    link: { href: 'http://flowcraft.app', label: 'flowcraft.app' },
    logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FFlowCraftLogo_New.png?alt=media&token=183bbf9f-adfc-4e05-accd-9e1ed15196f4',
    category: 'Apps',
    gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
  },
  {
    name: 'FlowCraft VS Code Extension',
    description:
      'Code to Diagrams in seconds. Create diagrams and flowcharts from code using AI.',
    link: {
      href: 'https://marketplace.visualstudio.com/items?itemName=FlowCraft.flowcraft',
      label: 'marketplace.visualstudio.com',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FFlowCraftLogo_New.png?alt=media&token=183bbf9f-adfc-4e05-accd-9e1ed15196f4',
    category: 'Apps',
    gradient: 'from-blue-400 via-blue-500 to-purple-600',
  },
  {
    name: 'MeNotepad',
    description:
      'A simple free full-featured note-taking website. No ads, no tracking.',
    link: { href: 'https://menotepad.com', label: 'menotepad.com' },
    logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FMenotepad_logo.png?alt=media&token=55ab9c06-3177-4fa3-86fc-90d55c28be11',
    category: 'Apps',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
  },
  {
    name: 'CommitAi',
    description:
      'A VS Code extension that helps you write better commit messages, unit tests, better method names, and more.',
    link: {
      href: 'https://marketplace.visualstudio.com/items?itemName=CommitAI.commit-ai',
      label: 'marketplace.visualstudio.com',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FResponAi_Logo.jpeg?alt=media&token=96a99bd7-4d04-4da6-8f7a-1841b915b4a3',
    category: 'Apps',
    gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
  },
  {
    name: 'CaptionR',
    description:
      'An iOS app that helps you generate captions for your pictures for Instagram, Facebook, and other social media platforms.',
    link: {
      href: 'https://apps.apple.com/us/app/captionr-ai-generated-caption/id6447811994',
      label: 'apps.apple.com',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FCaptionR_logo.png?alt=media&token=7ba4184c-b5c2-4371-8ee0-b07736777cf8',
    category: 'Apps',
    gradient: 'from-blue-400 via-blue-500 to-purple-600',
  },
]

const FeaturedCard = ({ project }: { project: (typeof projects)[0] }) => (
  <motion.div whileHover={{ y: -5 }} className="group relative col-span-2">
    <div
      className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-75 blur-xl transition-all duration-300 group-hover:opacity-100"
      style={{
        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
      }}
    />
    <Card
      as="div"
      className="relative h-full overflow-hidden rounded-3xl border-0 bg-white/10 backdrop-blur-md dark:bg-gray-900/50"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-10" />
      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4">
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 shadow-lg backdrop-blur-md dark:from-gray-800/10 dark:to-gray-800/5">
            <Image
              src={project.logo}
              alt=""
              className="h-10 w-10"
              unoptimized
              width={40}
              height={40}
            />
          </div>
          <div>
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-xl font-semibold text-transparent dark:from-white dark:to-gray-400">
                {project.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {project.link.label}
              </p>
            </a>
          </div>
        </div>
        <p className="mt-6 text-base text-gray-600 dark:text-gray-300">
          {project.description}
        </p>
      </div>
    </Card>
  </motion.div>
)

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => (
  <motion.div whileHover={{ y: -5 }} className="group relative">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-75 blur-lg transition-all duration-300 group-hover:opacity-100" />
    <Card
      as="div"
      className="relative h-full overflow-hidden rounded-2xl border-0 bg-white/10 backdrop-blur-md dark:bg-gray-900/50"
    >
      <div className="relative z-10 p-6">
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 shadow-lg backdrop-blur-md dark:from-gray-800/10 dark:to-gray-800/5">
          <Image
            src={project.logo}
            alt=""
            className="h-8 w-8"
            unoptimized
            width={32}
            height={32}
          />
        </div>
        <h2 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-base font-semibold text-transparent dark:from-white dark:to-gray-400">
          {project.name}
        </h2>
        <Card.Description>{project.description}</Card.Description>
        <div className="relative z-10 mt-6 flex text-sm font-medium text-gray-500 transition group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
          <span className="ml-2">{project.link.label}</span>
        </div>
      </div>
    </Card>
  </motion.div>
)

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.category === 'Featured')
  const otherProjects = projects.filter((p) => p.category !== 'Featured')

  return (
    <SimpleLayout
      title="Projects"
      intro="Building digital solutions for creators, sustainability, and the future."
    >
      <div className="space-y-16">
        {/* Featured Projects */}
        <section>
          <h2 className="mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-gray-400">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <FeaturedCard key={project.name} project={project} />
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section>
          <h2 className="mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-gray-400">
            More Projects
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>
      </div>
    </SimpleLayout>
  )
}
