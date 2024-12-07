'use client'
import React from 'react'
import { MermaidDiagram } from '@/components/MermaidDiagram'

const MLLearningPath = () => {
  return (
    <div className="space-y-8">
      <MermaidDiagram
        diagram={`
            graph TD
    A[Mathematics & Statistics] --> B[Programming Fundamentals]
    B --> C[Data Processing & Analysis]
    C --> D[Classical ML Algorithms]
    D --> E[Deep Learning]
    E --> F[Advanced Topics]
    
    style A fill:#e1f5fe
    style B fill:#e1f5fe
    style C fill:#e3f2fd
    style D fill:#e3f2fd
    style E fill:#e8eaf6
    style F fill:#e8eaf6
          `}
      />
    </div>
  )
}

export default MLLearningPath
