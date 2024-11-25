'use client'
import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { ArticlesList } from '@/components/ArticleList'

// export const metadata: Metadata = {
//   title: 'Articles',
//   description:
//     'This is where I write about my experiences, learnings, and thoughts on technology, sciences, startups, and life.',
// }

import { useEffect, useState } from 'react'

export default function ArticlesIndex() {
  const [articles, setArticles] = useState<ArticleWithSlug[]>([])

  useEffect(() => {
    async function fetchArticles() {
      let articles = await getAllArticles()
      setArticles(articles)
    }
    fetchArticles()
  }, [])

  return (
    <SimpleLayout
      title="Articles"
      intro="This is where I write about my experiences, learnings, and thoughts on technology, sciences, startups, and life."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <ArticlesList articles={articles} />
      </div>
    </SimpleLayout>
  )
}
