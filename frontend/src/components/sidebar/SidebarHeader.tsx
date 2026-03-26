import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Logo from "../../assets/react.svg"

type SidebarHeaderProps = {
  isExpanded: boolean
  isMobileOpen: boolean
  controlsId: string
  onToggleExpand: () => void
  onCloseMobile: () => void
}

export default function SidebarHeader({
  isExpanded,
  isMobileOpen,
  controlsId,
  onToggleExpand,
  onCloseMobile,
}: SidebarHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-2 pb-4">
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
        {isExpanded && (
          <div>
            <div className="text-base font-semibold text-white">Notes</div>
            <div className="text-xs text-white/50">Minimal</div>
          </div>
        )}
      </div>
      <div className="ml-auto flex items-center gap-2">
        {isMobileOpen && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-white/70 hover:text-white md:hidden
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
        <button
          type="button"
          onClick={onToggleExpand}
          className="hidden items-center justify-center rounded-md p-1.5 text-white/70 hover:text-white md:inline-flex
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isExpanded}
          aria-controls={controlsId}
        >
          <ChevronLeftIcon className={`h-5 w-5 transition-transform ${isExpanded ? "" : "rotate-180"}`} />
        </button>
      </div>
    </div>
  )
}
