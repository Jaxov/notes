// src/components/EmptyState.jsx
import { motion } from "framer-motion"; // Добавляем импорт

export default function EmptyState() {
  return (
    <motion.div
      className="col-span-full flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="text-5xl mb-4">📝</div>
      <h3 className="text-xl font-medium text-[#95DBFF] mb-2">Нет заметок</h3>
      <p className="text-gray-400 mb-4">Создайте свою первую заметку</p>
    </motion.div>
  );
}