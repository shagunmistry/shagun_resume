import { ArticleWithSlug } from '@/lib/articles'
import Article from '@/components/Article'

export function ArticlesList({ articles }: { articles: ArticleWithSlug[] }) {
  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <div
          key={article.slug}
          className="animate-fade-in-up"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'backwards'
          }}
        >
          <Article article={article} />
        </div>
      ))}
    </div>
  )
}