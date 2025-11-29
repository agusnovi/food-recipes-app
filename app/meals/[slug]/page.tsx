import Image from "next/image"
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getMeal } from "@/lib/meals"

import styles from './page.module.scss';

async function MealDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meal = await getMeal(slug);

  if (!meal) {
    notFound();
  }

  const instructions = meal.instructions.replace(/\n/g, '<br/>');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} alt={meal.image} priority fill />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by
            <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: instructions,
          }}
        ></p>
      </main>
    </>
  );
}

export default async function MealsSlugPages({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="loading">Loading data....!</p>}>
      <MealDetail params={params} />
    </Suspense>
  );
}