import Link from "next/link"

import MealsGrid from "@/components/meals/meals-grid";

import styles from "./page.module.scss"

export default function MealsPages() {
    return (
      <>
        <header className={styles.header}>
            <h1>Delicious meals, created <span className={styles.higlight}>by you</span></h1>
            <p>Choose your favorrite recipe and cook it yourself. It seem easy and fun!</p>
            <p className={styles.cta}>
                <Link href="/meals/share">Share Your Favorite Recipe</Link>
            </p>
        </header>
            <main className={styles.main}>
                <MealsGrid meals={[]} />
        </main>
      </>
    );
}