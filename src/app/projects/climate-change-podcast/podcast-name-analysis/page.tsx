'use client'
import React from 'react'
import { Card } from '@/components/Card'

const PodcastNames = () => {
  const names = [
    {
      category: 'Action-Oriented',
      options: [
        {
          name: 'Climate Catalysts',
          strength: 'Strong call to action, alliteration',
          seoScore: 8,
          memorability: 9,
          availability: 'Likely available',
          target: 'Change-makers and innovators',
        },
        {
          name: 'Solutions Rising',
          strength: 'Positive, forward-looking',
          seoScore: 7,
          memorability: 8,
          availability: 'Available on major platforms',
          target: 'Solution-focused audience',
        },
      ],
    },
    {
      category: 'Technical/Professional',
      options: [
        {
          name: 'The Climate Brief',
          strength: 'Professional, news-like',
          seoScore: 9,
          memorability: 8,
          availability: 'May need variation',
          target: 'Business professionals',
        },
        {
          name: 'Climate Tech Impact',
          strength: 'Focuses on solutions and technology',
          seoScore: 8,
          memorability: 7,
          availability: 'Likely available',
          target: 'Tech-oriented audience',
        },
      ],
    },
    {
      category: 'Conversational/Engaging',
      options: [
        {
          name: 'Climate Conversations',
          strength: 'Simple, clear purpose',
          seoScore: 7,
          memorability: 6,
          availability: 'May need variation',
          target: 'General audience',
        },
        {
          name: 'The Climate Quarter',
          strength: 'Business-like, regular update feel',
          seoScore: 8,
          memorability: 8,
          availability: 'Likely available',
          target: 'Business/Professional audience',
        },
      ],
    },
    {
      category: 'Unique/Memorable',
      options: [
        {
          name: 'Zero Sum Game',
          strength: 'Clever reference to net-zero',
          seoScore: 9,
          memorability: 9,
          availability: 'Check availability',
          target: 'Young professionals',
        },
        {
          name: 'Climate Crossroads',
          strength: 'Suggests important decision points',
          seoScore: 8,
          memorability: 8,
          availability: 'Likely available',
          target: 'Decision makers',
        },
      ],
    },
  ]

  return (
    <Card className="mx-auto mt-32 w-full max-w-4xl">
      <Card.Title>Climate Change Podcast Name Analysis</Card.Title>
      <Card.Description>
        <div className="space-y-6">
          {names.map((category, index) => (
            <div key={index} className="rounded-lg border bg-white p-4 shadow">
              <h3 className="mb-3 text-lg font-bold">{category.category}</h3>
              <div className="space-y-4">
                {category.options.map((option, i) => (
                  <div key={i} className="border-l-4 border-green-500 pl-3">
                    <h4 className="text-lg font-semibold">{option.name}</h4>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Strength:</span>{' '}
                        {option.strength}
                      </div>
                      <div>
                        <span className="font-medium">SEO Score:</span>{' '}
                        {option.seoScore}/10
                      </div>
                      <div>
                        <span className="font-medium">Memorability:</span>{' '}
                        {option.memorability}/10
                      </div>
                      <div>
                        <span className="font-medium">Availability:</span>{' '}
                        {option.availability}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Target Audience:</span>{' '}
                        {option.target}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card.Description>
    </Card>
  )
}

export default PodcastNames
