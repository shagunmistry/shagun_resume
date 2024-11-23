'use client'
import React, { useState } from 'react'
import { Card, } from '@/components/Card'
import { Button } from '@/components/Button'

const NLPDemo = () => {
  const [inputText, setInputText] = useState('')
  const [tokens, setTokens] = useState<string[]>([])
  const [showHint, setShowHint] = useState(false)

interface Token {
    token: string
}

const simulateTokenization = (text: string): void => {
    // Simple tokenization simulation (for demo purposes)
    const simpleTokens: Token[] = text
        .split(/([.,!?\s])/)
        .filter((token) => token.trim())
        .map((token) => ({ token }))
    setTokens(simpleTokens.map((t) => t.token))
}

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Try Tokenization</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter a sentence to tokenize..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-96 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <div className="flex space-x-2">
            <Button
              onClick={() => simulateTokenization(inputText)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Tokenize
            </Button>
            <Button variant="primary" onClick={() => setShowHint(!showHint)}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
          </div>

          {tokens.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 font-semibold">Tokens:</p>
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, index) => (
                  <span key={index} className="rounded bg-blue-100 px-2 py-1">
                    {token}
                  </span>
                ))}
              </div>
            </div>
          )}

          {showHint && (
            <div className="mt-4">
              <p className="mb-2 font-semibold">Hint:</p>
              <p className="text-sm">
                Try entering a sentence and click the "Tokenize" button to see how the sentence is
                tokenized.
              </p>
              </div>    
          )}
        </div>
      </Card>
    </div>
  )
}

export default NLPDemo
