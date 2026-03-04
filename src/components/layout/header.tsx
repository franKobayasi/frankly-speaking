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
        <header className="w-full">
            {/* 底部分割線 */}
            <div className="border-b border-[#E3E8EE]"></div>
            
            {/* 導航容器 */}
            <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center">
                {/* 導航連結 - 左側對齊 */}
                <nav className="flex gap-6">
                    {navConfig.map((nav) => (
                        <Link 
                            href={nav.pathName}
                            key={nav.pathName}
                        >
                            <a className="text-sm text-[#697386] hover:text-[#1A1F36] transition-colors">
                                {nav.title}
                            </a>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}
