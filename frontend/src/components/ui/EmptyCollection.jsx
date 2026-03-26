import { useState } from "react"
import { Button } from "./button"
import { motion } from "framer-motion"

export default function EmptyCollection({ onAdd }) {
  const [name, setName] = useState("")

  return (
    <motion.div
      className="col-span-full flex flex-col items-center justify-center py-8 px-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <h3 className="text-lg font-semibold text-[#95DBFF] mb-1">Нет коллекций</h3>
      <p className="text-gray-400 text-sm mb-3 text-center">Создайте свою первую коллекцию</p>

      <motion.div
        className="w-full flex flex-col gap-2"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Название коллекции"
          className="w-full px-2 py-1 rounded border-b-2 border-gray-500 bg-black/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#95DBFF] transition-colors text-sm"
        />
        <Button
          onClick={() => {
            if (name.trim()) {
              onAdd(name)
              setName("")
            }
          }}
          type="button"
          variant="magic"
          className="w-full py-1 text-sm"
        >
          Добавить
        </Button>
      </motion.div>
    </motion.div>
  )
}
