// src/components/ui/Alert.jsx

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, Info } from "lucide-react"

const variants = {
  error: {
    icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
    bg: "bg-red-500/10 border-red-500/30 text-red-400",
  },
  success: {
    icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    bg: "bg-green-500/10 border-green-500/30 text-green-400",
  },
  info: {
    icon: <Info className="w-4 h-4 text-blue-400" />,
    bg: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
}

export function Alert({ variant = "info", children }) {
  const style = variants[variant] || variants.info

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-xl border ${style.bg}`}
    >
      {style.icon}
      <span>{children}</span>
    </motion.div>
  )
}
