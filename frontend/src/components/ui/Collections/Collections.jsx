import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SidebarItem from "../SidebarItem"
import { FolderIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import EmptyCollection from "../EmptyCollection"
import { getCollections } from "../../../api/notes"

export default function Collections({ collections, setCollections }) {
  const [activeId, setActiveId] = useState(null)
  const [editId, setEditId] = useState(null)
  const [editValue, setEditValue] = useState("")

  // загрузка с сервера
  // загрузка коллекций
  useEffect(() => {
    getCollections().then(data => {
      console.log("Коллекции с сервера:", data)
      setCollections(data)
    })
  }, [])

  // создание
  async function addCollection(name) {
    try {
      const newCol = await createCollection({ name })
      setCollections([...collections, newCol])
    } catch (err) {
      console.error("Ошибка добавления:", err)
    }
  }

  // редактирование
  async function saveEdit(id) {
    if (!editValue.trim()) return
    try {
      const updated = await updateCollection(id, { name: editValue })
      setCollections(collections.map(c => (c.id === id ? updated : c)))
      setEditId(null)
      setEditValue("")
    } catch (err) {
      console.error("Ошибка редактирования:", err)
    }
  }

  function cancelEdit() {
    setEditId(null)
    setEditValue("")
  }

  // удаление
  async function removeCollection(id) {
    try {
      await deleteCollection(id)
      setCollections(collections.filter(c => c.id !== id))
    } catch (err) {
      console.error("Ошибка удаления:", err)
    }
  }

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {collections.length === 0 ? (
          <EmptyCollection onAdd={addCollection} />
        ) : (
          collections.map(col => (
            <motion.div
              key={col.id}
              layout
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="relative flex items-center group"
            >
              {editId === col.id ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center w-full gap-2 p-1 pl-2 rounded-md"
                >
                  <FolderIcon className="w-4 h-4 text-gray-400" />
                  <input
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") saveEdit(col.id)
                      if (e.key === "Escape") cancelEdit()
                    }}
                    autoFocus
                    className="flex-1 px-2 py-1 text-sm text-white bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </motion.div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <SidebarItem
                    icon={FolderIcon}
                    name={col.name}
                    displayedname={col.name}
                    active={activeId === col.id}
                    onClick={() => setActiveId(col.id)}
                    small
                  />
                  <motion.div className="flex gap-1 pr-2">
                    <button
                      className="p-1 text-gray-400 transition-colors rounded hover:text-blue-400 hover:bg-gray-700"
                      onClick={() => {
                        setEditId(col.id)
                        setEditValue(col.name)
                      }}
                      title="Редактировать"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 transition-colors rounded hover:text-red-400 hover:bg-gray-700"
                      onClick={() => removeCollection(col.id)}
                      title="Удалить"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  )
}
