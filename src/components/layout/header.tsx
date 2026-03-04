import Link from 'next/link'

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
    return (
        <header className="header-stripe">
            <nav className="header-nav">
                <div className="flex gap-[2px]">
                    {navConfig.map((nav) => (
                        <Link 
                            href={nav.pathName}
                            key={nav.pathName}
                            className="header-link"
                        >
                            {nav.title}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}
