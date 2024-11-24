import { motion } from 'motion/react'

export const ShimmerEffect = () => {
  return (
    <motion.div
      className="absolute inset-0 -z-10 overflow-hidden rounded-3xl"
      initial={false}
    >
      <motion.div
        className="absolute -left-48 top-0 h-[200%] w-[200%] -translate-x-full transform bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          translateX: ['0%', '100%'],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  )
}
