'use client'

import { Card } from '@/components/Card'
import { MermaidDiagram } from '@/components/MermaidDiagram'

const growthStrategyDiagram = `
graph TD
    subgraph Phase1["Solo Phase: Months 1-3"]
        S1[Data-Driven Episodes]
        S2[News Analysis]
        S3[Technology Reviews]
        S4[Policy Breakdowns]
        
        S1 -->|Build Expertise| SG1[Growing Audience]
        S2 -->|Stay Current| SG1
        S3 -->|Show Knowledge| SG1
        S4 -->|Demonstrate Understanding| SG1
    end

    subgraph Phase2["Transition: Months 4-6"]
        T1[Local Expert Interviews]
        T2[Academic Guests]
        T3[Industry Professionals]
        T4[Virtual Interviews]
        
        T1 & T2 & T3 & T4 -->|Build Network| TG1[Growing Authority]
    end

    subgraph Phase3["Scale: Months 7+"]
        F1[Influential Leaders]
        F2[Corporate Executives]
        F3[Policy Makers]
        F4[Climate Scientists]
        
        F1 & F2 & F3 & F4 -->|Establish Authority| FG1[Industry Leadership]
    end

    SG1 --> T1
    TG1 --> F1

    style Phase1 fill:#e6f3ff
    style Phase2 fill:#f0fff0
    style Phase3 fill:#ffe6e6
`

export default function GrowthStrategy() {
  return (
    <Card className="mx-auto mt-8 w-full max-w-5xl">
      <div className="space-y-6 p-6">
        <div className="text-center">
          <Card.Title as="h1">Podcast Growth Strategy</Card.Title>
          <Card.Description>
            A phased approach to building authority and audience in climate
            change podcasting
          </Card.Description>
        </div>

        <div className="space-y-8">
          <MermaidDiagram
            diagram={growthStrategyDiagram}
            title="Growth Strategy Timeline"
            className="mt-6"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {/* Phase 1 Card */}
            <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
              <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-400">
                Phase 1: Solo Foundation
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Focus on establishing core content and building initial audience
                through data-driven episodes and analysis.
              </p>
            </div>

            {/* Phase 2 Card */}
            <div className="rounded-lg border border-green-100 bg-green-50/50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
              <h3 className="mb-2 font-semibold text-green-900 dark:text-green-400">
                Phase 2: Network Building
              </h3>
              <p className="text-sm text-green-800 dark:text-green-300">
                Expand reach through expert interviews and building professional
                connections in the climate change space.
              </p>
            </div>

            {/* Phase 3 Card */}
            <div className="rounded-lg border border-red-100 bg-red-50/50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
              <h3 className="mb-2 font-semibold text-red-900 dark:text-red-400">
                Phase 3: Industry Leadership
              </h3>
              <p className="text-sm text-red-800 dark:text-red-300">
                Establish thought leadership by featuring influential voices and
                decision-makers in climate action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
