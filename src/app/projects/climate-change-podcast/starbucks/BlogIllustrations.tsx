import React from 'react'

export const CoffeeIllustration = () => (
  <svg className="my-8 h-64 w-full" viewBox="0 0 800 400">
    <defs>
      <linearGradient id="cup-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#006241" />
        <stop offset="100%" stopColor="#004C32" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect width="800" height="400" fill="#F8F9FA" />

    {/* Coffee Cup Stream */}
    <g transform="translate(100, 50)">
      {[...Array(10)].map((_, i) => (
        <g key={i} transform={`translate(${i * 60}, 0)`}>
          <path d="M20,0 L40,300 L0,300 L20,0" fill="#006241" opacity={0.1} />
        </g>
      ))}
    </g>

    {/* Main Cup */}
    <g transform="translate(350, 150)">
      <path d="M0,0 L100,0 L90,200 L10,200 Z" fill="url(#cup-gradient)" />
      <path d="M100,0 L120,20 L110,220 L90,200 Z" fill="#004C32" />
      <text x="50" y="100" textAnchor="middle" fill="white" className="text-sm">
        58/sec
      </text>
    </g>
  </svg>
)

export const SupplyChainIllustration = () => (
  <svg className="my-8 h-64 w-full" viewBox="0 0 800 400">
    {/* Background */}
    <rect width="800" height="400" fill="#F8F9FA" />

    {/* Supply Chain Path */}
    <path
      d="M100,200 C200,100 600,300 700,200"
      stroke="#006241"
      strokeWidth="4"
      fill="none"
      strokeDasharray="8,8"
    />

    {/* Locations */}
    <g transform="translate(100, 200)">
      <circle cx="0" cy="0" r="20" fill="#006241" />
      <text x="0" y="40" textAnchor="middle" className="text-sm">
        Ethiopia
      </text>
    </g>

    <g transform="translate(700, 200)">
      <circle cx="0" cy="0" r="20" fill="#006241" />
      <text x="0" y="40" textAnchor="middle" className="text-sm">
        Seattle
      </text>
    </g>

    {/* Distance Label */}
    <text x="400" y="150" textAnchor="middle" className="text-sm font-bold">
      8,000 miles
    </text>
  </svg>
)
