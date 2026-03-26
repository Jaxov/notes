import { Outlet } from "react-router-dom"
import { SidebarShell } from "../sidebar"
import Navbar from "./Navbar"

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-200">
      {/* Sidebar слева */}
      <SidebarShell />

      {/* Правая часть */}
      <div className="flex-1 flex flex-col">
        {/* Navbar сверху */}
        <Navbar />

        {/* Контент под ним */}
        <main className="flex-1 p-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
