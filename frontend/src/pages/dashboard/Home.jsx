// pages/Home.jsx
import { useState, useEffect } from 'react'
import {
  RectangleStackIcon,
  QueueListIcon,
  ClockIcon,
  TableCellsIcon,
} from '@heroicons/react/24/solid'
import KanbanColumn from './ui/KanbanColumn'

export default function Home() {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    review: [],
    done: []
  })
  const [activeView, setActiveView] = useState('kanban')
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const views = [
    { id: 'kanban', label: 'Kanban', icon: RectangleStackIcon },
    { id: 'list', label: 'List', icon: QueueListIcon },
    { id: 'timeline', label: 'Timeline', icon: ClockIcon },
    { id: 'table', label: 'Table', icon: TableCellsIcon },
  ]

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        // API request here
        const mockData = {
          todo: ['Design homepage', 'Create wireframes', 'Write documentation', 'Setup project structure', 'Install dependencies'],
          inProgress: ['Fix navigation bug'],
          review: ['Review pull request', 'Test login flow'],
          done: ['Setup project']
        }
        
        setColumns(mockData)
        setError(null)
      } catch (err) {
        setError('Failed to load tasks')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* View selector */}
      <div className="mb-6 flex justify-start">
        <div className="relative h-8 rounded-md bg-white/5 px-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.04)]">
          <div
            className="absolute left-1 top-0 h-full w-28 rounded-md border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_18px_rgba(0,0,0,0.35)] transition-transform duration-200"
            style={{
              transform: `translateX(${views.findIndex((view) => view.id === activeView) * 100}%)`,
            }}
          />
          <div className="relative grid h-full grid-cols-4 text-xs font-medium">
            {views.map((view) => (
              <div
                key={view.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveView(view.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setActiveView(view.id)
                  }
                }}
                className={`flex h-full w-28 items-center justify-center gap-2 px-2 transition-colors
                  ${activeView === view.id ? 'text-white' : 'text-white/60 hover:text-white'}`}
                aria-pressed={activeView === view.id}
              >
                <view.icon className="h-4 w-4" />
                <span>{view.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Four columns - centered */}
      <div className="flex justify-center gap-4">
        <KanbanColumn
          title="To Do"
          bgColor="bg-zinc-900"
          cards={columns.todo}
          showGlow={true}
          textColor="text-white"
          cardBgColor="bg-gray-100"
        />

        <KanbanColumn
          title="In Progress"
          bgColor="bg-zinc-900"
          cards={columns.inProgress}
          textColor="text-white"
          cardBgColor="bg-gray-100"
        />

        <KanbanColumn
          title="Review"
          bgColor="bg-zinc-900"
          cards={columns.review}
          textColor="text-white"
          cardBgColor="bg-gray-100"
        />

        <KanbanColumn
          title="Done"
          bgColor="bg-zinc-900"
          cards={columns.done}
          textColor="text-white"
          cardBgColor="bg-gray-100"
        />
      </div>
    </div>
  )
}
