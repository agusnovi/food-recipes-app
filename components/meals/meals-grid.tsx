import { Meal } from "@/app/meals/[slug]/page";
import MealItem from "./meal-item";

import styles from "./meals-grid.module.scss"

export default function MealsGrid({
  meals,
}: {
  meals: Meal[];
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