import { allTags } from '../data/posts'

interface SidebarProps {
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  onClearAll: () => void
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ selectedTags, onTagToggle, onClearAll, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay md:hidden" 
          onClick={onClose}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="sidebar-title mb-0">Filter by Tags</h2>
          {selectedTags.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary"
            >
              Clear all
            </button>
          )}
        </div>
        
        <div className="space-y-1">
          {allTags.map((tag) => (
            <div key={tag} className="tag-checkbox">
              <input
                type="checkbox"
                id={`tag-${tag}`}
                checked={selectedTags.includes(tag)}
                onChange={() => onTagToggle(tag)}
              />
              <label htmlFor={`tag-${tag}`}>{tag}</label>
            </div>
          ))}
        </div>

        {/* Active filters display */}
        {selectedTags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border-light dark:border-border-dark">
            <p className="text-xs text-text-secondary dark:text-text-dark-secondary mb-2">
              Active filters:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-accent text-white"
                >
                  {tag}
                  <button
                    onClick={() => onTagToggle(tag)}
                    className="hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
