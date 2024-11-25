import Link from 'next/link'
import { ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-purple-200/30 bg-gradient-to-b from-white/80 to-white/50 p-6 shadow-sm backdrop-blur-lg transition-all duration-500 hover:shadow-xl dark:from-purple-950/20 dark:to-purple-900/10">
      {/* Background gradient effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-100/0 via-purple-200/0 to-purple-300/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10 dark:from-purple-400/0 dark:via-purple-300/0 dark:to-purple-200/0"
        aria-hidden="true"
      />

      {/* Title with hover effect */}
      <Link
        href={`/articles/${article.slug}`}
        className="relative block transition duration-300 ease-out group-hover:scale-[1.01]"
      >
        <h2 className="relative text-xl font-semibold tracking-tight text-purple-900 dark:text-purple-100">
          {article.title}
          <span className="absolute -bottom-px left-0 h-[2px] w-0 bg-gradient-to-r from-purple-400/40 via-purple-500/40 to-transparent transition-all duration-300 ease-out group-hover:w-full" />
        </h2>
      </Link>

      {/* Date with line decoration */}
      <time
        dateTime={article.date}
        className="relative mt-2 flex items-center text-sm text-purple-600/80 dark:text-purple-400/80"
      >
        <span className="absolute left-0 h-[2px] w-2 bg-purple-400/60 transition-all duration-300 ease-out group-hover:w-4" />
        <span className="ml-4 translate-y-0 transition-transform duration-300 ease-out group-hover:translate-y-0">
          {formatDate(article.date)}
        </span>
      </time>

      {/* Description with fade-in styling */}
      <p className="mt-4 text-sm text-purple-800/70 transition-colors duration-300 group-hover:text-purple-800/90 dark:text-purple-200/70 dark:group-hover:text-purple-200/90">
        {article.description}
      </p>

      {/* CTA with arrow animation */}
      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/articles/${article.slug}`}
          className="group/link inline-flex items-center gap-2 text-sm font-medium text-purple-600 transition-colors duration-300 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <span>Read article</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="stroke-current transition-transform duration-300 group-hover/link:translate-x-1"
          >
            <path
              d="M6.75 3.25L11.25 8l-4.5 4.75"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-3 top-3 h-20 w-20 rounded-full bg-gradient-to-br from-purple-200/0 via-purple-300/0 to-transparent opacity-0 blur-2xl transition-all duration-500 group-hover:from-purple-200/20 group-hover:via-purple-300/10 group-hover:opacity-100" />
      
      {/* Apple-style bottom shine effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </article>
  )
}

export default Article