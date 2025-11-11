import MealItem from "./meal-item";

import styles from "./meals-grid.module.scss"

export default function MealsGrid({
  meals,
}: {
  meals: {
    image: string;
    slug: string;
    creator: string;
    title: string;
    summary: string;
  }[];
}) {
  return (
    <ul className={styles.grid}>
      {meals.map((meal, index) => {
        return (
          <li key={index}>
            <MealItem {...meal} />
          </li>
        );
      })}
    </ul>
  );
}