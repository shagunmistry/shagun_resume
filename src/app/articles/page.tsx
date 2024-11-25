'use client'
import { useState, useEffect } from 'react'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ArticlesList } from '@/components/ArticleList'
import type { ArticleWithSlug } from '@/lib/articles'

export default function ArticlesIndex() {
  const [articles, setArticles] = useState<ArticleWithSlug[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles')
        if (!response.ok) throw new Error('Failed to fetch articles')
        const data = await response.json()
        setArticles(data.articles)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (isLoading) {
    return (
      <SimpleLayout
        title="Articles"
        intro="This is where I write about my experiences, learnings, and thoughts on technology, sciences, startups, and life."
      >
        <div className="flex justify-center">
          <div className="animate-pulse">Loading articles...</div>
        </div>
      </SimpleLayout>
    )
  }

  if (error) {
    return (
      <SimpleLayout
        title="Articles"
        intro="This is where I write about my experiences, learnings, and thoughts on technology, sciences, startups, and life."
      >
        <div className="text-red-500">Error: {error}</div>
      </SimpleLayout>
    )
  }

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
