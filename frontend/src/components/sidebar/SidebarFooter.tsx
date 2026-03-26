import { useEffect, useRef, useState, type MouseEvent } from "react"
import {
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline"

type SidebarFooterProps = {
  isExpanded: boolean
}

type Account = {
  id: string
  name: string
  plan: "Pro" | "Free"
  avatarColor: string
  daysLeft: number | null
  email: string
}

const accounts: Account[] = [
  {
    id: "personal",
    name: "Alex",
    plan: "Pro",
    avatarColor: "bg-gradient-to-br from-purple-500 to-pink-500",
    daysLeft: 3,
    email: "alex@example.com",
  },
  {
    id: "work",
    name: "Work",
    plan: "Free",
    avatarColor: "bg-gradient-to-br from-blue-500 to-cyan-400",
    daysLeft: null,
    email: "work@company.com",
  },
  {
    id: "family",
    name: "Family",
    plan: "Pro",
    avatarColor: "bg-gradient-to-br from-green-500 to-emerald-400",
    daysLeft: 15,
    email: "family@home.com",
  },
]

export default function SidebarFooter({ isExpanded }: SidebarFooterProps) {
  const [activeAccount, setActiveAccount] = useState("personal")
  const [showAccountsMenu, setShowAccountsMenu] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(true)
  const accountsMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountsMenuRef.current && !accountsMenuRef.current.contains(event.target as Node)) {
        setShowAccountsMenu(false)
      }
    }

    if (showAccountsMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showAccountsMenu])

  const activeAccountData = accounts.find((acc) => acc.id === activeAccount)

  const handleSwitchAccount = (accountId: string) => {
    setActiveAccount(accountId)
    setShowAccountsMenu(false)
  }

  const handleAddAccount = (event: MouseEvent) => {
    event.stopPropagation()
    setShowAccountsMenu(false)
  }

  const handleDeleteAccount = (accountId: string, event: MouseEvent) => {
    event.stopPropagation()
    if (accounts.length <= 1) {
      return
    }
    if (accountId === activeAccount) {
      const otherAccount = accounts.find((acc) => acc.id !== accountId)
      if (otherAccount) {
        setActiveAccount(otherAccount.id)
      }
    }
  }

  return (
    <div className="relative" ref={accountsMenuRef}>
      {showUpgrade && (
        <div className="mb-3 rounded-lg border border-white/10 bg-white/5 p-3 text-white/80">
          <div className="flex items-start justify-between gap-2">
            <div className="text-sm font-semibold text-white">Upgrade to Pro</div>
            <button
              type="button"
              onClick={() => setShowUpgrade(false)}
              className="rounded-md p-1 text-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              aria-label="Close upgrade"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-1 text-xs text-white/50">Unlock team views and more.</div>
          <button
            type="button"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white
              hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <ArrowUpRightIcon className="h-4 w-4" />
            Upgrade
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setShowAccountsMenu((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-left text-[13px] text-white/80
          transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
        aria-label="Account menu"
        title={!isExpanded ? activeAccountData?.name : undefined}
      >
        <div className="flex items-center gap-2">
          <div className={`relative h-7 w-7 rounded-full ${activeAccountData?.avatarColor}`}>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
              {activeAccountData?.name.charAt(0)}
            </div>
          </div>
          {isExpanded && (
            <div className="flex-1">
            <div className="text-[13px] font-medium text-white">
              {activeAccountData?.name}
            </div>
            <div className="text-[11px] text-white/40">
              {activeAccountData?.plan}
              {activeAccountData?.daysLeft ? ` • ${activeAccountData.daysLeft}d` : ""}
            </div>
            </div>
          )}
        </div>
        {isExpanded && (
          <ChevronRightIcon
            className={`h-4 w-4 text-white/50 transition-transform ${showAccountsMenu ? "rotate-90" : ""}`}
          />
        )}
      </button>

      {showAccountsMenu && (
        <div
          className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="text-sm font-semibold text-white">Accounts</div>
            <button
              type="button"
              onClick={handleAddAccount}
              className="rounded-md p-1.5 text-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              aria-label="Add account"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[180px] overflow-y-auto">
            {accounts.map((account) => (
              <div
                key={account.id}
                onClick={() => handleSwitchAccount(account.id)}
                className={`flex cursor-pointer items-center justify-between px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/5
                  ${activeAccount === account.id ? "bg-white/10" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`relative h-7 w-7 rounded-full ${account.avatarColor}`}>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                      {account.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{account.name}</div>
                    <div className="text-xs text-white/40">{account.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeAccount === account.id ? (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400 text-white">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </div>
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-white/20" />
                  )}
                  {accounts.length > 1 && (
                    <button
                      type="button"
                      onClick={(event) => handleDeleteAccount(account.id, event)}
                      className="rounded-md p-1.5 text-white/40 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                      aria-label="Delete account"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
