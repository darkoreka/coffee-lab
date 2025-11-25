import logo from '@/assets/logo.png'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

type NavItem = {
    href: string
    label: string
    type: 'route' | 'anchor'
}

const NAV_ITEMS: NavItem[] = [
    { href: '/', label: 'Home', type: 'route' },
    { href: '/#services', label: 'Services', type: 'anchor' },
    { href: '/#product', label: 'Product', type: 'anchor' },
    { href: '/reviews', label: 'Reviews', type: 'route' },
    { href: '/#footer', label: 'Contact', type: 'anchor' }
]

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const { pathname } = useLocation()

    const linkClass = (isActive: boolean) =>
        [
            'px-5 py-2 text-sm font-medium transition-all duration-150 rounded-full',
            isActive ? 'bg-[#b68b62]/90 text-[#1f1310] shadow-inner' : 'text-[#d2b08a]/80 hover:text-[#f2ddc4]'
        ].join(' ')

    const mobileLinkClass = (isActive: boolean) =>
        [
            'text-sm font-medium',
            isActive ? 'text-[#f2ddc4]' : 'text-[#d2b08a]'
        ].join(' ')

    const handleCloseMobile = () => setIsOpen(false)

    const renderLink = (item: NavItem, isMobile = false) => {
        const isRoute = item.type === 'route'
        const isActive = isRoute && pathname === item.href
        const className = isMobile ? mobileLinkClass(isActive) : linkClass(isActive)

        if (isRoute) {
            return (
                <Link key={item.href} to={item.href} onClick={handleCloseMobile} className={className}>
                    {item.label}
                </Link>
            )
        }

        return (
            <a key={item.href} href={item.href} onClick={handleCloseMobile} className={className}>
                {item.label}
            </a>
        )
    }

    return (
        <header className="sticky top-0 z-50 w-full">
            <nav className="mx-auto flex h-[86px] max-w-[1440px] items-center justify-between px-4 md:px-8">
                {/* Logo block */}
                <Link to="/" className="flex items-center gap-3">
                    <span className="flex items-center justify-center ">
                        <img src={logo} alt="Coffee Lab logo" className="h-18 w-18 object-contain" />
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-2 rounded-ful px-2 py-2 ">
                    {NAV_ITEMS.map((item) => renderLink(item))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center rounded-full border border-[#6d523e] p-2 text-[#d2b08a] hover:text-white lg:hidden"
                >
                    <Menu size={24} />
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden border-t border-[#6d523e] bg-[#1d120f] px-4 py-4">
                    <div className="flex flex-col gap-4">
                        {NAV_ITEMS.map((item) => renderLink(item, true))}
                    </div>
                </div>
            )}
        </header>
    )
}
