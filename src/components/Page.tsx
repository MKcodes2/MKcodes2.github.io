import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

// Wraps each page so route changes fade and slide in.
export default function Page({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.12, ease: 'easeIn' } }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
