'use client'

import { ReactNode } from 'react';
import Link from "next/link"
import { usePathname } from "next/navigation"

import styles from "./nav-link.module.scss"

export default function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
console.log(pathname)
  return (
    <Link
      href={href}
      className={
        pathname.startsWith(href)
          ? `${styles.link} ${styles.active}`
          : styles.link
      }
    >
      {children}
    </Link>
  );
}