"use client"

import { useState } from "react"
import Link from "next/link"
import { BlueArenaLogoSmall } from "./BlueArenaLogoSmall"
import { Avatar } from "./ui/avatar"
import { Menu, X } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Matches", href: "/matches" },
  { name: "About us", href: "/about" },
  { name: "FAQ", href: "/faq" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-background py-4">
      <div className="max-w-[1024px] mx-auto px-[24px] flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <BlueArenaLogoSmall />
        </Link>

        <div className="md:hidden">
          <button
            className="text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block absolute md:relative top-16 md:top-0 left-0 right-0 bg-background md:bg-transparent`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0 py-4 md:py-0 px-[24px] md:px-0">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Avatar className="h-8 w-8 bg-[#1e293b] text-white">
            <span className="text-sm">JG</span>
          </Avatar>
          <span className="text-gray-300">jorge_99_gamer</span>
        </div>
      </div>
    </header>
  )
}

