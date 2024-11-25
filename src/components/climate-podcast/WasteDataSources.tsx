import React from 'react'
import { motion } from 'motion/react'
import {
  ExternalLink,
  Database,
  Factory,
  ShoppingBag,
  Trash2,
} from 'lucide-react'
import { Card } from '@/components/Card'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const WasteDataSources = () => {
  const categories = [
    {
      title: 'Global Waste Statistics',
      icon: <Database className="h-5 w-5 text-purple-500" />,
      sources: [
        {
          title: 'World Bank What A Waste Global Database',
          description:
            'Comprehensive data on solid waste management from around the world. Updated every 2-3 years.',
          link: 'https://datatopics.worldbank.org/what-a-waste/',
          updated: 'Biennial',
        },
        {
          title: 'UN Stats Waste Statistics',
          description:
            'Environmental indicators including waste generation and treatment by country.',
          link: 'https://unstats.un.org/unsd/envstats/qindicators.cshtml',
          updated: 'Annual',
        },
      ],
    },
    {
      title: 'Industry & Corporate Waste',
      icon: <Factory className="h-5 w-5 text-emerald-500" />,
      sources: [
        {
          title: 'EPA Toxics Release Inventory',
          description:
            'US facility-level waste and pollution data from industrial facilities.',
          link: 'https://www.epa.gov/toxics-release-inventory-tri-program',
          updated: 'Quarterly',
        },
        {
          title: 'Ellen MacArthur Foundation Circulytics',
          description:
            'Corporate circular economy metrics including waste data from participating companies.',
          link: 'https://ellenmacarthurfoundation.org/resources/circulytics/overview',
          updated: 'Annual',
        },
      ],
    },
    {
      title: 'Fashion & Retail Waste',
      icon: <ShoppingBag className="h-5 w-5 text-pink-500" />,
      sources: [
        {
          title: 'Fashion Revolution Transparency Index',
          description:
            "Annual report on fashion brands' environmental impacts including waste metrics.",
          link: 'https://www.fashionrevolution.org/about/transparency/',
          updated: 'Annual',
        },
        {
          title: 'Zero Waste Fashion Database',
          description:
            'Crowdsourced data on fashion waste, recycling, and circular initiatives.',
          link: 'https://zerowastedatabase.com',
          updated: 'Monthly',
        },
      ],
    },
    {
      title: 'Plastic Waste Tracking',
      icon: <Trash2 className="h-5 w-5 text-blue-500" />,
      sources: [
        {
          title: 'Break Free From Plastic Brand Audits',
          description:
            'Global audits of plastic pollution by brand and company.',
          link: 'https://www.breakfreefromplastic.org/brandaudits',
          updated: 'Annual',
        },
        {
          title: 'Plastics Tracker',
          description:
            'Real-time estimates of global plastic production and waste.',
          link: 'https://plasticstracker.org',
          updated: 'Real-time',
        },
      ],
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 p-12"
    >
      {categories.map((category, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center gap-2">
            {category.icon}
            <h2 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-lg font-semibold text-transparent">
              {category.title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {category.sources.map((source, sourceIndex) => (
              <Card key={sourceIndex}>
                <Card.Eyebrow decorate className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Updated: {source.updated}
                  </span>
                </Card.Eyebrow>

                <Card.Title href={source.link}>{source.title}</Card.Title>

                <Card.Description>{source.description}</Card.Description>

                <Card.Cta>
                  <Link href={source.link}>View Dataset</Link>
                </Card.Cta>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8">
        <Card className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/90 dark:to-pink-900/90">
          <Card.Title>Note on Data Freshness</Card.Title>
          <Card.Description>
            Data update frequencies vary by source. While some provide real-time
            or monthly updates, others may be updated annually or biennially.
            Always check the source website for the most current information.
          </Card.Description>
        </Card>
      </div>
    </motion.div>
  )
}

export default WasteDataSources
