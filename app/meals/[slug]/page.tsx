import Image from "next/image"
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getMeal } from "@/lib/meals"

import styles from './page.module.scss';

export type Meal = {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

function isMeal(value: unknown): value is Meal {
  return !!value && typeof value === 'object'
}

async function MealDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meal = await getMeal(slug);

  if (!meal) {
    notFound();
  }

  const instructions = isMeal(meal) && meal.instructions.replace(/\n/g, '<br/>');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image
            src={isMeal(meal) ? meal.image : ''}
            alt={isMeal(meal) ? meal.image : ''}
            priority
            fill
          />
        </div>
        <div className={styles.headerText}>
          <h1>{isMeal(meal) && meal.title}</h1>
          <p className={styles.creator}>
            by
            <a href={`mailto:${isMeal(meal) && meal.creator_email}`}>
              {isMeal(meal) && meal.creator}
            </a>
          </p>
          <p className={styles.summary}>{isMeal(meal) && meal.summary}</p>
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