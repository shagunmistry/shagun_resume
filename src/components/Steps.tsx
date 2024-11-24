'use client'
import React from 'react'
import { Children, isValidElement, useContext } from 'react'
import { createContext } from 'react'
import { motion } from 'motion/react'

interface StepsContextValue {
  activeStep: number
  stepsCount: number
}

const StepsContext = createContext<StepsContextValue>({
  activeStep: 0,
  stepsCount: 0,
})

interface StepsProps {
  children: React.ReactNode
  activeStep?: number
}

const Steps = ({ children, activeStep = 0 }: StepsProps) => {
  const stepsCount = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Step,
  ).length

  return (
    <StepsContext.Provider value={{ activeStep, stepsCount }}>
      <div className="relative flex flex-col gap-8 pb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/20 backdrop-blur-xl" />
        {children}
      </div>
    </StepsContext.Provider>
  )
}

interface StepProps {
  children: React.ReactNode
  title?: string
}

const Step = ({ children, title }: StepProps) => {
  const { activeStep, stepsCount } = useContext(StepsContext)
  const childArray = Children.toArray(children)
  const currentIndex = childArray.findIndex(
    (child) => isValidElement(child) && child === children,
  )
  const isActive = currentIndex === activeStep
  const isCompleted = currentIndex < activeStep

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: currentIndex * 0.1 }}
      className="relative flex gap-6"
    >
      {/* Connector line with gradient */}
      <div className="absolute bottom-0 left-5 top-12 -z-10 w-0.5">
        <div className="h-full w-full bg-gradient-to-b from-purple-200/50 via-blue-300/50 to-transparent" />
      </div>

      {/* Step indicator with modern gradient */}
      <div className="flex-none pt-1">
        <div
          className={`
            relative flex h-10 w-10 items-center justify-center rounded-xl
            ${
              isCompleted || isActive
                ? 'shadow-lg shadow-indigo-200/50'
                : 'shadow-sm'
            }
            transition-all duration-300 ease-out
          `}
        >
          {/* Gradient background */}
          <div
            className={`
              absolute inset-0 rounded-xl
              ${
                isCompleted
                  ? 'bg-gradient-to-br from-violet-400 via-blue-500 to-cyan-400'
                  : isActive
                    ? 'bg-gradient-to-br from-violet-200 via-blue-300 to-cyan-200'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
              }
              transition-opacity duration-300
            `}
          />

          {/* Content */}
          <div className="relative">
            {isCompleted ? (
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <span
                className={`text-sm font-semibold ${
                  isActive ? 'text-white' : 'text-gray-600'
                }`}
              >
                {currentIndex + 1}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Step content with glass effect */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: currentIndex * 0.15 }}
        className={`relative flex-1 rounded-2xl pb-8 transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-70'
        }`}
      >
        {title && (
          <h3
            className={`
              mb-3 font-medium tracking-tight
              ${
                isCompleted || isActive
                  ? 'bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-lg text-transparent'
                  : 'text-gray-400'
              }
            `}
          >
            {title}
          </h3>
        )}
        <div
          className={`
            rounded-xl bg-gradient-to-br from-white/40 to-white/20 p-6 
            backdrop-blur-sm transition-all duration-300
            ${
              isActive
                ? 'shadow-lg shadow-indigo-100/20'
                : 'shadow-sm shadow-gray-100/10'
            }
          `}
        >
          <div className="text-gray-600">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export { Steps, Step }
