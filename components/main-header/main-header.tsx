import Link from "next/link"
import Image from "next/image"

import NavLink from "./nav-link";

import Logo from "@/assets/logo.png"

import MainHeaderBacground from "./main-header-background";

import styles from './main-header.module.scss';

export default function MainHeader() {
  return (
    <>
      <MainHeaderBacground />
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Image src={Logo} alt="logo" priority />
          Meals
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">
                Foodies Community
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}