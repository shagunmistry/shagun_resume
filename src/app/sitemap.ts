import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://shazzamm.dev'

  console.log('Generating sitemap...')
  console.log("Base Path: ", path.join(process.cwd(), '/app/articles'))
  const articlesDirectory = path.join(process.cwd(), '/app/articles')
  const articleSlugs = fs
    .readdirSync(articlesDirectory)
    .filter((file) =>
      fs.statSync(path.join(articlesDirectory, file)).isDirectory(),
    )

  const staticPages = ['', '/about', '/projects', '/tech']

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const articleRoutes = articleSlugs.map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...articleRoutes]
}
