import Image from "next/image"
import Link from "next/link"

import styles from "./meal-item.module.scss"

export default function MealItem({
  image,
  slug,
  creator,
  title,
  summary,
}: {
  image: string;
  slug: string;
  creator: string;
  title: string;
  summary: string;
  }) {
  
  return (
    <article className={styles.meals}>
      <header>
        <div className={styles.image}>
          <Image
            src={`https://food-s3-nextjs-img.s3.amazonaws.com/${image}`}
            fill
            alt="image"
          />
        </div>
        <div className={styles.headerText}>
          <h2>{title}</h2>
          <p>{creator}</p>
        </div>
      </header>
      <div className={styles.content}>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.cta}>
          <Link href={`/meals/${slug}`}>View Detail</Link>
        </div>
      </div>
    </article>
  );
}