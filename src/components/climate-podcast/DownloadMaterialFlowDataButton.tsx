'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useState } from 'react'

const DownloadButton = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleDownload = () => {
    // Create download link
    const link = document.createElement('a')
    link.href = 'https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/data%2Festat_env_ac_mfa_filtered.tsv?alt=media&token=2b7a34ef-078f-49a1-9767-cd1efc9164a0'
    link.download = 'material-flow.tsv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.button
      className={`
        group
        relative
        flex
        items-center
        gap-2
        rounded-full
        px-6
        py-3
        text-sm
        font-medium
        transition-all
        duration-300
        ${isPressed ? 'scale-95' : isHovered ? 'scale-105' : 'scale-100'}
      `}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleDownload}
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.18)',
      }}
    >
      {/* Background gradient that changes on hover */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-80"
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, #0ea5e9, #6366f1)'
            : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          zIndex: -1,
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Content */}
      <span className="relative z-10 text-white">Download Dataset</span>
      <Download
        className={`
          relative
          z-10
          h-4
          w-4
          text-white
          transition-transform
          duration-300
          ${isHovered ? 'translate-y-0.5' : 'translate-y-0'}
        `}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        animate={{
          opacity: isHovered ? 0.15 : 0,
          backgroundPosition: isHovered ? '200% 50%' : '0% 50%',
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />
    </motion.button>
  )
}

export default DownloadButton
