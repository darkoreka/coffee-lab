import logo from '@/assets/logo.png'
import { Menu, Search, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
    { href: '#home', label: 'Home' },
    { href: '#menu', label: 'Menu' },
    { href: '#services', label: 'Services' },
    { href: '#product', label: 'Product' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' }
]

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [active, setActive] = useState('#home')

    return (
        <header className="sticky top-0 z-50 w-full">
            <nav className="mx-auto flex h-[86px] max-w-[1440px] items-center justify-between px-4 md:px-8">
                {/* Logo block */}
                <a href="/" className="flex items-center gap-3">
                    <span className="flex items-center justify-center ">
                        <img src={logo} alt="Coffee Lab logo" className="h-18 w-18 object-contain" />
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-2 rounded-ful px-2 py-2 ">
                    {NAV_ITEMS.map(({ href, label }) => {
                        const isActive = active === href
                        return (
                            <button
                                key={href}
                                onClick={() => setActive(href)}
                                className={[
                                    'px-5 py-2 text-sm font-medium transition-all duration-150 rounded-full',
                                    isActive
                                        ? 'bg-[#b68b62]/90 text-[#1f1310] shadow-inner'
                                        : 'text-[#d2b08a]/80 hover:text-[#f2ddc4]'
                                ].join(' ')}
                            >
                                {label}
                            </button>
                        )
                    })}
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
                        {NAV_ITEMS.map(({ href, label }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={() => {
                                    setActive(href)
                                    setIsOpen(false)
                                }}
                                className={`text-sm font-medium ${active === href ? 'text-[#f2ddc4]' : 'text-[#d2b08a]'
                                    }`}
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}
