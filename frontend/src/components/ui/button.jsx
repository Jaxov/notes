// src/components/ui/Button.jsx
import { motion } from "framer-motion"

export function Button({
  variant = "default",
  children,
  className = "",
  ...props
}) {
  const base = "rounded-xl px-4 py-2 font-medium transition select-none"
  const variants = {
    default: "bg-zinc-100 hover:bg-zinc-200 text-black",
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    magic: "bg-gradient-to-r from-[#A27EFF] to-[#95DBFF] text-black shadow-md",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
