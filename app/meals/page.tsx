import Link from "next/link"
import { Suspense } from "react";

import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals"

import styles from "./page.module.scss"

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default async function MealsPages() {
  
  
    return (
      <>
        <header className={styles.header}>
          <h1>
            Delicious meals, created{' '}
            <span className={styles.higlight}>by you</span>
          </h1>
          <p>
            Choose your favorrite recipe and cook it yourself. It seem easy and
            fun!
          </p>
          <p className={styles.cta}>
            <Link href="/meals/share">Share Your Favorite Recipe</Link>
          </p>
        </header>
        <main className={styles.main}>
          <Suspense
            fallback={<p className={styles.loading}>Loading data....!</p>}
          >
            <Meals />
          </Suspense>
        </main>
      </>
    );
}