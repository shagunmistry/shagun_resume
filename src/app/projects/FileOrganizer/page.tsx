import { Container } from '@/components/Container'
import Info from './info.mdx'
import { Prose } from '@/components/Prose'

export default function Page() {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-5xl">
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                File Organizer - A Desktop Application to Organize Files
                Automatically
              </h1>
              <time
                dateTime="2021-08-01"
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </time>
            </header>
            <Prose className="mt-8 w-full" data-mdx-content>
              <Info />
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
