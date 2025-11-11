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
    <article>
      <header className={styles.header}>
        <Image src={image} fill alt="image" />
        <h2>{title}</h2>
        <p>{creator}</p>
      </header>
        <div className={styles.content}>
            <p>{summary}</p>
            <Link href={`/meals/${slug}`}>View Detail</Link>
        </div>
    </article>
  );
}