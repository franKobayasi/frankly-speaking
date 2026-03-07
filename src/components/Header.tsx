import Link from 'next/link'
import { useRouter } from 'next/router'

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
  onMenuToggle?: () => void
}

const navItems = [
  { title: 'Blog', path: '/blog' },
  { title: 'About', path: '/about' },
  { title: 'Projects', path: '/projects' },
]

export default function Header({ darkMode, toggleDarkMode, onMenuToggle }: HeaderProps) {
  const router = useRouter()
  
  // Check if current path matches nav item
  const isActive = (path: string) => {
    if (path === '/blog' && (router.pathname === '/blog' || router.pathname.startsWith('/blog/'))) {
      return true
    }
    return router.pathname === path
  }

  return (
    <header className="header-stripe">
      <div className="header-nav">
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', color: 'inherit' }}>
            Frankly Speaking
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} className={`header-link ${isActive(item.path) ? 'active' : ''}`}>
              {item.title}
            </Link>
          ))}
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="dark-mode-toggle ml-2"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-primary dark:text-text-dark-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
