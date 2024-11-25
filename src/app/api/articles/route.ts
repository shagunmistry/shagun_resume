import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles'

export async function GET() {
  try {
    const articles = await getAllArticles()
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('There was an error fetching articles: ', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 },
    )
  }
}
