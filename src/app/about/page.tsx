import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'

const socialLinks = [
  {
    href: 'https://twitter.com/mistry_shagun',
    icon: XIcon,
    text: 'Follow on X',
  },
  {
    href: 'https://www.instagram.com/shazzamm_/',
    icon: InstagramIcon,
    text: 'Follow on Instagram',
  },
  {
    href: 'https://github.com/shagunmistry',
    icon: GitHubIcon,
    text: 'Follow on GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/shagun-mistry/',
    icon: LinkedInIcon,
    text: 'Follow on LinkedIn',
  },
  {
    href: 'mailto:shagun.mistry@hotmail.com',
    icon: MailIcon,
    text: 'Email me',
  },
]

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I am Shagun Mistry. Developer who loves to build things and write about technology, startups, and life.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Me_and_Zola.JPG?alt=media&token=75a08c15-8438-4386-b27a-22f913c60bab"
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              width={320}
              height={320}
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Hi. I’m Shagun Mistry.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I'm a curious soul with a bunch of passions buzzing around in my
              head. By day (and sometimes night) I'm fascinated by the world of
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {' '}
                AI and Machine Learning
              </span>{' '}
              – how can we use these incredible technologies to make a positive
              impact? But then my inner inventor kicks in, and I'm sketching out
              ideas for robots that might help animals or even revolutionize the
              way we exercise.
            </p>
            <p>
              Speaking of animals, they hold a special place in my heart. I'm a
              huge advocate for{' '}
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {' '}
                Animal Welfare{' '}
              </span>{' '}
              and would love to see a future where all creatures are treated
              with respect and compassion. Maybe even use some of that techie
              knowledge to develop solutions for them!
            </p>
            <p>
              On a more personal note, I'm a total movie buff and secretly
              harbor a dream of being a
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {' '}
                Cinematographer
              </span>{' '}
              someday. Capturing stories and emotions through the lens – that's
              pure magic. And to keep this body fueled for all these adventures,
              I'm a big believer in
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {' '}
                Fitness
              </span>
              . It's not just about looking good, it's about feeling good and
              having the energy to chase those wild ideas.
            </p>
            <p>
              Who knows what the future holds? Maybe I'll be building AI-powered
              prosthetics for animals, directing a documentary about animal
              conservation efforts, or even creating the next big fitness app
              with a machine learning twist. This website is my space to explore
              these passions, share my journey, and hopefully connect with
              others who are just as curious and excited about the world's
              possibilities!
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            {socialLinks.map(({ href, icon, text }) => (
              <SocialLink
                key={href}
                href={href}
                icon={icon}
                className="border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                {text}
              </SocialLink>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
