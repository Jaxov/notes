// components/KanbanColumn.jsx
import { useState } from 'react'

export default function KanbanColumn({ 
  title, 
  count = 0, 
  bgColor = 'bg-gray-50',
  cards = [],
  showGlow = false,
  textColor = 'text-gray-700',
  cardBgColor = 'bg-white'
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={`${bgColor} rounded-lg p-4 min-h-[500px] w-[270px] ${bgColor === 'bg-zinc-900' ? '' : 'border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {showGlow && (
            <div className="w-0.5 h-4 rounded-full" 
                 style={{ 
                   backgroundColor: '#5551bfff',
                   boxShadow: '0 0 6px #134150, 0 0 10px #134150'
                 }} 
            />
          )}
          <h2 className={`font-medium text-base ${textColor}`}>{title}</h2>
        </div>
        
        {/* Три точки */}
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-400 hover:text-gray-600 text-xl px-1"
          >
            ⋮
          </button>
          
          {/* Выпадашка */}
          {menuOpen && (
            <>
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  Option 1
                </div>
                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  Option 2
                </div>
                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  Option 3
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        {/* Здесь будут карточки */}
      </div>
    </div>
  )
}