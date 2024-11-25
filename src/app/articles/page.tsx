import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/articles'
import { ArticlesList } from '@/components/ArticleList'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'This is where I write about my experiences, learnings, and thoughts on technology, sciences, startups, and life.',
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Articles"
      intro="This is where I write about my experiences, learnings, and thoughts on technology, sciences, startups, and life."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          <ArticlesList articles={articles} />
        </div>
      </div>
    </SimpleLayout>
  )
}
