'use client'

import Link from "next/link"
import clsx from 'clsx'
import { usePathname } from "next/navigation"

export const links = [
  { name: "About", href: "/about", key: "about"},
  { name: "Projects", href: "/projects", key: "projects" },
  { name: "Blog", href: "/blog", key: "blog" },
  { name: "Consulting", href: "/consulting", key: "consulting"},
]

export default function Navigation() {
  const path = usePathname();

  return (
    <ul className="flex flex-row justify-center space-x-5">
      {links.map((link) => {
        return (
          <Link href={link.href} key={link.key}>
            <li key={link.name}>
              {link.name}
            </li>
          </Link>
        )
      })}
    </ul>
  )
}