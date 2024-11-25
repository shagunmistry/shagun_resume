'use client'
import { motion } from 'motion/react'
import { ArticleWithSlug } from '@/lib/articles'
import Article from '@/components/Article'

export function ArticlesList({ articles }: { articles: ArticleWithSlug[] }) {
  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {articles.map((article) => (
        <motion.div
          key={article.slug}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.4,
            type: 'spring',
            stiffness: 100,
          }}
        >
          <Article article={article} />
        </motion.div>
      ))}
    </motion.div>
  )
}
