import Link from 'next/link'
import { useRouter } from 'next/router'

const navConfig = [
    {
        title: "Home",
        pathName: "/"
    },
    {
        title: "Blog",
        pathName: "/blog"
    },
    {
        title: "Portfolio",
        pathName: "/portfolio"
    }
]

export default function Header() {
    const router = useRouter()
    
    return (
        <header className="header-stripe">
            <nav className="header-nav">
                <div style={{ display: 'flex', gap: '1px' }}>
                    {navConfig.map((nav) => (
                        <Link 
                            href={nav.pathName}
                            key={nav.pathName}
                            className={`header-link ${router.pathname === nav.pathName ? 'active' : ''}`}
                        >
                            {nav.title}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}
