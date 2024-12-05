'use client'
import React from 'react'
import { motion } from 'motion/react'
import StarbucksDashboard from './StarbucksDashboard'
import { SupplyChainIllustration } from './BlogIllustrations'
import Starbucks58SecondsIllustration from './Starbucks58Seconds.jpg'
import Image from 'next/image'

interface CalloutProps {
  type: 'info' | 'warning'
  children: React.ReactNode
}

const Callout: React.FC<CalloutProps> = ({ type, children }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-300 dark:text-blue-200',
    warning: 'bg-amber-50 border-amber-500 text-amber-700 dark:bg-amber-900 dark:border-amber-300 dark:text-amber-200',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`my-8 rounded-r border-l-4 p-6 ${styles[type]}`}
    >
      {children}
    </motion.div>
  )
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const StarbucksBlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
      <article className="mx-auto max-w-prose">
        <motion.h1
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100"
        >
          The Environmental Cost of Your Morning Coffee
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-8 text-lg text-gray-700 dark:text-gray-100"
        >
          Every second, roughly 58 disposable cups from Starbucks enter our
          waste system. That's 5 million drinks daily in the US alone. But
          before we talk about where these cups end up, let's start where each
          day begins...
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <Image
            src={Starbucks58SecondsIllustration}
            alt="Starbucks 58 Seconds"
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.h2
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-6 mt-12 text-3xl font-bold text-gray-900 dark:text-gray-100"
        >
          The Daily Ritual
        </motion.h2>

        <motion.p
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-8 text-lg text-gray-700 dark:text-gray-100"
        >
          It's 4:30 AM, and like clockwork, lights flicker on in thousands of
          Starbucks stores across America. Each store is about to embark on a
          daily ritual that will consume enough water to fill an Olympic-sized
          swimming pool every three days.
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="my-12"
        >
          <StarbucksDashboard />
        </motion.div>

        <motion.h2
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-6 mt-12 text-3xl font-bold text-gray-900 dark:text-gray-100"
        >
          The Empire of Coffee
        </motion.h2>

        <motion.p
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-8 text-lg text-gray-700 dark:text-gray-100"
        >
          Picture this: If you lined up all Starbucks stores side by side, they
          would stretch from New York to Los Angeles. With a presence in 83
          countries and annual revenue exceeding $23.5 billion, Starbucks isn't
          just serving coffee - they're running a small nation's economy.
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <SupplyChainIllustration />
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-8 text-lg text-gray-700 dark:text-gray-100"
        >
          <p className="mb-4">
            To understand these numbers, imagine following a single coffee
            bean's journey. From the moment it's planted in Ethiopia to the
            second it's served in Seattle, that bean will:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Travel an average of 8,000 miles</li>
            <li>Use enough water to fill a bathtub</li>
            <li>
              Generate the same carbon emissions as driving a car for 30 miles
            </li>
          </ul>
        </motion.div>

        <motion.h2
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-6 mt-12 text-3xl font-bold text-gray-900 dark:text-gray-100"
        >
          The Water Crisis
        </motion.h2>

        <motion.p
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-8 text-lg text-gray-700 dark:text-gray-100"
        >
          Every single cup of coffee requires 37 gallons of water to produce.
          With 5 million drinks served daily in the US alone, that's enough
          water to fill Lake Tahoe every year. But in this crisis lies
          unprecedented opportunity.
        </motion.p>

        <Callout type="info">
          In Israel, water recycling technology already achieves 90% efficiency
          in agricultural operations. In Singapore, NEWater technology purifies
          wastewater to exceed WHO drinking water standards.
        </Callout>

        <motion.h2
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-6 mt-12 text-3xl font-bold text-gray-900 dark:text-gray-100"
        >
          The Investment in Change
        </motion.h2>

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-8 rounded-lg bg-emerald-50 p-6"
        >
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span className="font-bold">Agroforestry</span>
              <span className="text-emerald-700">$987 million</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-bold">Sustainable Packaging</span>
              <span className="text-emerald-700">$230 million</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-bold">Farmer Loans</span>
              <span className="text-emerald-700">$80 million</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-bold">Community Resilience</span>
              <span className="text-emerald-700">$40 million</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-bold">Dairy Alternatives Research</span>
              <span className="text-emerald-700">$6 million</span>
            </li>
          </ul>
        </motion.div>

        <motion.h2
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-6 mt-12 text-3xl font-bold text-gray-900 dark:text-gray-100"
        >
          The Innovation Opportunity
        </motion.h2>

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              Packaging Innovation
            </h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-100">
              <li>California startup testing 100% reusable cup model</li>
              <li>Potential to eliminate single-use waste entirely</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              Supply Chain Technology
            </h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-100">
              <li>Blockchain meeting coffee farming</li>
              <li>Real-time emissions tracking and optimization</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              Consumer Engagement
            </h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-100">
              <li>Gamifying sustainability for retail customers</li>
              <li>Turning daily coffee runs into environmental actions</li>
            </ul>
          </div>
        </motion.div>

        <Callout type="warning">
          The company that transformed coffee culture is now laying out a
          roadmap for the next generation of innovators. Every problem they face
          is a market waiting to be served.
        </Callout>

        <motion.h2
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-6 mt-12 text-3xl font-bold text-gray-900 dark:text-gray-100"
        >
          Looking Forward
        </motion.h2>

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-4 text-gray-700 dark:text-gray-100"
        >
          <p>
            The next chapter isn't just about survival - it's about the
            incredible opportunities being created:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Water recycling technology that could save millions of gallons per
              store
            </li>
            <li>
              AI-powered supply chain solutions that could optimize farming by
              10x
            </li>
            <li>
              Consumer apps that could make sustainability profitable and
              engaging
            </li>
          </ul>
        </motion.div>

        <motion.blockquote
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="my-12 border-l-4 border-emerald-500 pl-6 text-2xl italic text-gray-700 dark:text-gray-100"
        >
          "The best time to plant a tree was 20 years ago. The second best time
          is today."
        </motion.blockquote>
      </article>
    </div>
  )
}

export default StarbucksBlogPage
