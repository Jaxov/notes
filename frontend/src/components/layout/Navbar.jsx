import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import NotificationBell from "../ui/navbar/NotificationBell"
export default function Navbar() {
  return (
    <nav className="w-full h-16 flex items-center justify-end px-6 gap-6 bg-transparent">
      {/* Поиск */}
      <div className="relative">
        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск..."
          className="pl-10 pr-3 py-1.5 rounded-xl border border-white/20 bg-white/5 
                     text-sm text-gray-200 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                     backdrop-blur-md"
        />
      </div>

      {/* Уведомления */}
      <NotificationBell></NotificationBell>
        

      {/* Аватар */}
      <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 shadow-lg cursor-pointer hover:scale-105 transition">
        <img
          src="https://i.pravatar.cc/100?img=3"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </nav>
  )
}
