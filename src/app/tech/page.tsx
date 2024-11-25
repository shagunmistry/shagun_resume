'use client'
import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}


export default function TechStack() {
  return (
    <SimpleLayout title="Tech Stack" intro="What I use to get things done.">
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="14” MacBook Pro, M1, 16GB RAM 500GB Storage">
            The M-series chips are just amazing. Ever since I switched to the
            M1, I’ve been able to run all of my development tools and even some
            light gaming without any issues.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Microsoft VS Code">
            I’ve tried to switch to other editors a few times but always end up
            back here. The ecosystem is just too good.
          </Tool>
          <Tool title="Postman">
            I’ve been using Postman for years and it’s still the best tool for
            testing APIs.
          </Tool>
          <Tool title="Github & Gitlab">
            I use Github for all of my personal projects and Gitlab for work.
            Both are great but I prefer the Github UI.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Tailwind UI">
            Tailwind UI's premade templates and components have been a huge time
            saver for me.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Apple Notes">
            I’ve tried a lot of note-taking apps but always end up back here.
            It’s simple and just works.
          </Tool>
          <Tool title="Apple Reminders">
            I use reminders for everything from work tasks to grocery lists.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
