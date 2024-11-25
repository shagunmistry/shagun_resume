'use client'

import clsx from 'clsx'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-md bg-gray-200/80 dark:bg-gray-700/50',
        className,
      )}
      {...props}
    />
  )
}
