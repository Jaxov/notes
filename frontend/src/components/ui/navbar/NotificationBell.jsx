import { useState, useRef, useEffect } from "react"
import { BellIcon } from "@heroicons/react/24/outline"
import { motion, useAnimation } from "framer-motion"
import { getNotifications, markNotificationAsRead,
  deleteNotification } from "../../../api/notify"



export default function NotificationPanel() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const panelRef = useRef(null)
  const controls = useAnimation()

  // загрузить уведомления
  const fetchNotifications = async () => {
    try {
      const data = await getNotifications()
      setNotifications(data)
    } catch (err) {
      console.error("Ошибка загрузки уведомлений:", err)
    }
  }

  // отметить прочитанным
  const markAsRead = async (id) => {
    await markNotificationAsRead(id)
    fetchNotifications()
  }

  // удалить уведомление
  const deleteNotif = async (id) => {
    await deleteNotification(id)
    fetchNotifications()
  }

  // закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // анимация колокольчика
  const ring = async () => {
    await controls.start({
      rotate: [0, -15, 15, -10, 10, -5, 5, 0],
      transition: { duration: 0.8, ease: "easeInOut" },
    })
  }

  // при открытии подгружаем уведомления
  const togglePanel = () => {
    setOpen(!open)
    ring()
    if (!open) fetchNotifications()
  }

  const unreadCount = notifications.filter((n) => n.status === "unread").length

  return (
    <div className="relative" ref={panelRef}>
      {/* кнопка */}
      <motion.button
        className="relative p-2 rounded-full hover:bg-white/10 transition"
        onClick={togglePanel}
        animate={controls}
      >
        <BellIcon className="w-6 h-6 text-gray-200" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-xs text-white flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </motion.button>

      {/* панель */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-3 w-80 rounded-xl bg-[#111]/90 backdrop-blur-md shadow-xl border border-white/10 overflow-hidden z-50"
        >
          <div className="px-4 py-2 border-b border-white/10 text-sm font-semibold">
            Уведомления
          </div>
          <ul className="max-h-64 overflow-y-auto divide-y divide-white/10">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className={`px-4 py-2 text-sm flex justify-between items-center ${
                    n.status === "unread" ? "bg-neutral-800" : ""
                  }`}
                >
                  <div className="flex-1">
                    {n.type === "comment" && (
                      <p>
                        💬 {n.payload.author} оставил комментарий:{" "}
                        <span className="text-gray-400">{n.payload.text}</span>
                      </p>
                    )}
                    {n.type === "share" && (
                      <p>📤 {n.payload.shared_by} поделился заметкой</p>
                    )}
                    {n.type === "system" && (
                      <p>
                        ⚙️ {n.payload.title}:{" "}
                        <span className="text-gray-400">{n.payload.message}</span>
                      </p>
                    )}
                  </div>
                  <div className="ml-2 flex flex-col gap-1">
                    {n.status === "unread" && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="text-xs text-blue-400 hover:underline"
                      >
                        ✔
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotif(n.id)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      ✖
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-center text-sm text-gray-400">
                Нет уведомлений
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  )
}
