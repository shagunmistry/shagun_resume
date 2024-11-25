'use client'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { Resume } from '@/components/Resume'
import { ArticlesList } from '@/components/ArticleList'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   let form = event.currentTarget
  //   let email = form.querySelector('input[type="email"]')
  //   let button = form.querySelector('button')
  //   let message = form.querySelector('p')
  //   let success = form.querySelector('button[aria-label="Success"]')

  //   if (
  //     email instanceof HTMLInputElement &&
  //     button instanceof HTMLButtonElement &&
  //     message instanceof HTMLElement
  //   ) {
  //     email.disabled = true
  //     button.disabled = true
  //     message.textContent = 'Subscribing...'
  //     message.classList.remove('text-red-600')
  //     message.classList.add('text-zinc-600')

  //     fetch('/api/subscribe', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email: email.value }),
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           form.reset()
  //           message.textContent = 'Success! 🎉'
  //           message.classList.remove('text-zinc-600')
  //           message.classList.add('text-green-600')
  //         } else {
  //           message.textContent = 'An error occurred. Please try again.'
  //           message.classList.remove('text-zinc-600')
  //           message.classList.add('text-red-600')
  //         }
  //       })
  //       .catch(() => {
  //         message.textContent = 'An error occurred. Please try again.'
  //         message.classList.remove('text-zinc-600')
  //         message.classList.add('text-red-600')
  //       })
  //       .finally(() => {
  //         email.disabled = false
  //         button.disabled = false
  //       })
  //   }
  // }

  return (
    <iframe
      src="https://embeds.beehiiv.com/dfc07193-61a6-44f5-95b1-8d694b393034"
      data-test-id="beehiiv-embed"
      width="100%"
      height="320"
      className="rounded-2xl bg-zinc-50 shadow-lg dark:border"
    ></iframe>
  )
}

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          src={role.logo}
          alt=""
          className="h-7 w-7"
          unoptimized
          width={28}
          height={28}
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        {/* <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd> */}
      </dl>
    </li>
  )
}

// function Resume() {
//   let resume: Array<Role> = [
//     {
//       company: 'ATI',
//       title: 'Senior Software DevOps Engineer',
//       logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FATI%20logo.png?alt=media&token=aef3494f-909f-4447-a4f4-2acb97a4209c',
//       start: '2019',
//       end: {
//         label: 'Present',
//         dateTime: new Date().getFullYear().toString(),
//       },
//     },
//     {
//       company: 'Xactly',
//       title: 'Senior Software Developer',
//       logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FXactly%20logo%20white.svg?alt=media&token=6a62934a-b168-4b7b-aa37-bbf2b9ffc397',
//       start: '2014',
//       end: '2019',
//     },
//     {
//       company: 'Centene',
//       title: 'Senior Software Developer',
//       logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FCentene%20Logo%202023.jpg?alt=media&token=a7433614-11f4-4439-901c-3b8622c6f6b1',
//       start: '2014',
//       end: '2019',
//     },
//     {
//       company: 'EasyKnock',
//       title: 'Senior Software Developer',
//       logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FEasyKnock%20Logo.svg?alt=media&token=668070db-cec4-4356-9d27-eb0968b3866e',
//       start: '2014',
//       end: '2019',
//     },
//     {
//       company: 'VitusVet',
//       title: 'Senior Software Developer',
//       logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FVitusVet%20logo.png?alt=media&token=f453f53e-8073-40ed-8e66-126a5668bca4',
//       start: '2011',
//       end: '2014',
//     },
//     {
//       company: 'Ria Money Transfer | EuroNet',
//       title: 'Full-stack Developer',
//       logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FRiaLogo.svg?alt=media&token=b7d8ef5d-f8c9-4871-97da-6d45df2bf670',
//       start: '2008',
//       end: '2011',
//     },
//     {
//       company: 'WiPro',
//       title: 'Software Engineer',
//       logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FWipro_logo.svg?alt=media&token=833a7d56-b66d-42c0-bc3c-fd76234c16cb',
//       start: '2014',
//       end: '2019',
//     },
//     {
//       company: 'SourceLink',
//       title: 'Enterprise Software Developer',
//       logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FsourceLink_Logo.jpeg?alt=media&token=6b468aab-9310-4c43-9b4d-eac0ba29d997',
//       start: '2014',
//       end: '2019',
//     },
//   ]

//   return (
//     <div className="rounded-2xl p-6 shadow-lg dark:border dark:border-purple-400">
//       <h2 className="flex text-sm font-semibold text-purple-900 dark:text-purple-100">
//         <BriefcaseIcon className="h-6 w-6 flex-none" />
//         <span className="ml-3">Work</span>
//       </h2>
//       <ol className="mt-6 space-y-4">
//         {resume.map((role, roleIndex) => (
//           <Role key={roleIndex} role={role} />
//         ))}
//       </ol>
//       <Button
//         variant="secondary"
//         className="group mt-6 w-full"
//         href="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Shagun%20Mistry%20Resume.pdf?alt=media&token=77caa21f-7bbd-4d42-bbda-08d7180bfc67"
//         download={true}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Download CV
//         <ArrowDownIcon className="h-4 w-4 stroke-purple-400 transition group-active:stroke-purple-600 dark:group-hover:stroke-purple-50 dark:group-active:stroke-purple-50" />
//       </Button>
//     </div>
//   )
// }

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <h1 className="text-center text-4xl font-bold tracking-tight text-purple-700 sm:text-5xl dark:text-purple-500">
          Shagun Mistry
        </h1>
        <p className="mt-6 text-center text-purple-600 dark:text-purple-400">
          Software Developer, Machine Learning Enthusiast, Cinema Lover, and a
          Avid Reader.
        </p>
        <div className="mx-auto max-w-2xl">
          <div className="mt-6 flex items-center justify-between gap-6">
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
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {/* {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))} */}
            <ArticlesList articles={articles} />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
