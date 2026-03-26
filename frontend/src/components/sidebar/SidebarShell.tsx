import { useEffect, useId, useState } from "react"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { useLocation } from "react-router-dom"
import SidebarHeader from "./SidebarHeader"
import SidebarSection from "./SidebarSection"
import SidebarFooter from "./SidebarFooter"
import { sidebarGroups } from "./sidebarConfig"

type SidebarShellProps = {
  className?: string
}

export default function SidebarShell({ className = "" }: SidebarShellProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const sidebarId = useId()
  const location = useLocation()

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  const isOverlayMode = !isDesktop
  const shouldHide = isOverlayMode && !isMobileOpen

  return (
    <>
      {!isMobileOpen && (
        <button
          type="button"
          className="fixed left-4 top-4 z-40 rounded-md border border-white/10 bg-zinc-900/90 p-2 text-white/80 shadow-lg md:hidden
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          aria-label="Open sidebar"
          aria-expanded={isMobileOpen}
          aria-controls={sidebarId}
          onClick={() => setIsMobileOpen(true)}
        >
          <Bars3Icon className="h-5 w-5" />
        </button>
      )}
      {isMobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-label="Close sidebar"
          aria-controls={sidebarId}
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside
        id={sidebarId}
        aria-hidden={shouldHide ? true : undefined}
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col bg-zinc-900 text-white shadow-lg transition-transform
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          w-56 max-w-[80vw] border-r border-white/10
          md:static md:translate-x-0 md:shadow-none md:flex-shrink-0
          ${isExpanded ? "md:w-56" : "md:w-14"}
          ${shouldHide ? "pointer-events-none" : "pointer-events-auto"}
          ${className}`}
      >
        <div className="flex h-full flex-col px-4 py-4">
          <SidebarHeader
            isExpanded={isExpanded}
            isMobileOpen={isMobileOpen}
            controlsId={sidebarId}
            onToggleExpand={() => setIsExpanded((prev) => !prev)}
            onCloseMobile={() => setIsMobileOpen(false)}
          />
          <div className="px-1 pb-4">
            <div className="h-1 rounded-full bg-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.04)]" />
          </div>

          <nav className="flex flex-1 flex-col gap-4" aria-label="Sidebar navigation">
            {sidebarGroups.map((group, index) => (
              <SidebarSection
                key={group.id}
                group={group}
                isExpanded={isExpanded}
                showDivider={index > 0}
                onNavigate={() => setIsMobileOpen(false)}
              />
            ))}
          </nav>


        

          
        </div>
      </aside>
    </>
  )
}
