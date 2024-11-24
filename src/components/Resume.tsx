'use client'

import { motion, AnimatePresence } from 'motion/react'
import { ArrowDownIcon, BriefcaseIcon } from 'lucide-react'
import { useState } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

function Role({ role, index }: { role: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.li
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex cursor-pointer gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20"
    >
      {/* Company Logo with Zoom Effect */}
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative h-16 w-16 overflow-hidden rounded-xl bg-white/30 shadow-sm backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-blue-100/40 dark:from-purple-900/40 dark:to-blue-900/40" />
        <motion.img
          src={role.logo}
          alt={role.company}
          className="h-full w-full object-contain p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content with Hover Effects */}
      <motion.div
        className="flex-1"
        animate={{
          x: isHovered ? 5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.h3
          className="font-semibold tracking-tight"
          animate={{
            color: isHovered
              ? 'var(--color-purple-600)'
              : 'var(--color-gray-900)',
          }}
        >
          {role.company}
        </motion.h3>

        <motion.p
          className="mt-1 text-sm leading-tight text-gray-500 dark:text-gray-400"
          animate={{
            opacity: isHovered ? 1 : 0.8,
          }}
        >
          {role.title}
        </motion.p>

        {/* Decorative gradient line */}
        <motion.div
          className="absolute bottom-0 left-20 right-4 h-px"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isHovered ? 1 : 0,
            background:
              'linear-gradient(to right, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.1))',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.li>
  )
}

export function Resume() {
  const resume = [
    {
      company: 'ATI',
      title: 'Senior Software DevOps Engineer',
      logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FATI%20logo.png?alt=media&token=aef3494f-909f-4447-a4f4-2acb97a4209c',
    },
    {
      company: 'Xactly',
      title: 'Senior Software Developer',
      logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FXactly%20logo%20white.svg?alt=media&token=6a62934a-b168-4b7b-aa37-bbf2b9ffc397',
    },
    {
      company: 'Centene',
      title: 'Senior Software Developer',
      logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FCentene%20Logo%202023.jpg?alt=media&token=a7433614-11f4-4439-901c-3b8622c6f6b1',
    },
    {
      company: 'EasyKnock',
      title: 'Senior Software Developer',
      logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FEasyKnock%20Logo.svg?alt=media&token=668070db-cec4-4356-9d27-eb0968b3866e',
    },
    {
      company: 'VitusVet',
      title: 'Senior Software Developer',
      logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FVitusVet%20logo.png?alt=media&token=f453f53e-8073-40ed-8e66-126a5668bca4',
    },
    {
      company: 'Ria Money Transfer | EuroNet',
      title: 'Full-stack Developer',
      logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FRiaLogo.svg?alt=media&token=b7d8ef5d-f8c9-4871-97da-6d45df2bf670',
    },
    {
      company: 'WiPro',
      title: 'Software Engineer',
      logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FWipro_logo.svg?alt=media&token=833a7d56-b66d-42c0-bc3c-fd76234c16cb',
    },
    {
      company: 'SourceLink',
      title: 'Enterprise Software Developer',
      logo: 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/Logos%2FsourceLink_Logo.jpeg?alt=media&token=6b468aab-9310-4c43-9b4d-eac0ba29d997',
    },
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="overflow-hidden rounded-2xl bg-white/20 p-6 shadow-lg backdrop-blur-xl 
                 dark:border dark:border-purple-400/30 dark:bg-purple-950/10"
    >
      {/* Header with animation */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center text-sm font-semibold text-purple-900 dark:text-purple-100"
      >
        <motion.div
          whileHover={{ rotate: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          <BriefcaseIcon className="h-6 w-6 flex-none" />
        </motion.div>
        <span className="ml-3">Work Experience</span>
      </motion.h2>

      {/* Resume list with stagger effect */}
      <motion.ol variants={containerVariants} className="mt-6 space-y-4">
        {resume.map((role, index) => (
          <Role key={role.company} role={role} index={index} />
        ))}
      </motion.ol>

      {/* Download button with hover effects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r 
                     from-purple-500 to-blue-500 px-4 py-2 text-white shadow-lg 
                     transition-all hover:from-purple-600 hover:to-blue-600"
          href="your-cv-link"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Download CV</span>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <ArrowDownIcon className="h-4 w-4 stroke-current" />
          </motion.div>
        </motion.a>
      </motion.div>
    </motion.div>
  )
}
