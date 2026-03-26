// src/components/ui/GlowWrapper.jsx

import { motion } from "framer-motion"

export default function GlowWrapper({ children, className = "" }) {
  return (
    <motion.div
      layout
      className={`relative w-full max-w-sm ${className}`}
    >
      {/* Glow-фон */}
      <motion.div
        layout
        aria-hidden="true"
        className="
          absolute inset-0
          rounded-3xl
          bg-[conic-gradient(from_0deg_at_50%_50%,#A27EFF,#95DBFF,#A27EFF)]
          blur-2xl
          opacity-50
          pointer-events-none
          z-0
          animate-glow
          bg-[length:400%_400%]
        "
      />
      {/* Контент */}
      <motion.div layout className="relative z-10">
        {children}
      </motion.div>
    </motion.div>
  )
}
