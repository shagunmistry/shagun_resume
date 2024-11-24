import { motion } from 'motion/react'

export const GradientBackground = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 rounded-3xl"
      initial={false}
      animate={{
        background: isHovered
          ? 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.05), rgba(79, 70, 229, 0.1))'
          : 'linear-gradient(to bottom right, transparent, transparent)',
      }}
      transition={{ duration: 0.3 }}
    />
  )
}
