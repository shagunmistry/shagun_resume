import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

const projects = [
  {
    name: 'FlowCraft',
    description:
      'Creating diagrams and flowcharts from plain text description, using AI.',
    link: { href: 'http://flowcraft.app', label: 'flowcraft.app' },
    logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FFlowCraftLogo_New.png?alt=media&token=183bbf9f-adfc-4e05-accd-9e1ed15196f4',
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
  },
  {
    name: 'MeNotepad',
    description:
      'A simple free full-featured note-taking website. No ads, no tracking.',
    link: { href: 'https://menotepad.com', label: 'menotepad.com' },
    logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FMenotepad_logo.png?alt=media&token=55ab9c06-3177-4fa3-86fc-90d55c28be11',
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
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’ve made trying to put my dent in the universe.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Projects"
      intro="Here are some of the projects I’ve worked on over the years."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-transparent">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
                width={32}
                height={32}
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
