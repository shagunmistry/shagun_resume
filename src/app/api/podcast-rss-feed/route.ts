import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

export async function GET() {
  try {
    const parser = new Parser()
    const feed = await parser.parseURL('https://anchor.fm/s/fe5ce500/podcast/rss')

    const episodes = feed.items.map((item) => ({
      title: item.title,
      description: item.contentSnippet,
      pubDate: item.pubDate,
      duration: item.itunes?.duration,
      audioUrl: item.enclosure?.url,
    }))

    return NextResponse.json({ episodes })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          status: 500,
          message: error.message,
        },
        { status: 500 },
      )
    } else {
      return NextResponse.json(
        {
          status: 500,
          message: 'An unknown error occurred',
        },
        { status: 500 },
      )
    }
  }
}
