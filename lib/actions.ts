'use server'

import { redirect } from "next/navigation";
import { postMeal } from "./meals";

function isInvalid(text: string): boolean {
  return text.trim() === '' && !text
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function shareMeal(previousState: any, formData: any) {
  const meal = {
    title: formData.get('title'),
    image: formData.get('image'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalid(meal.title) ||
    isInvalid(meal.summary) ||
    isInvalid(meal.creator) ||
    isInvalid(meal.instructions) ||
    isInvalid(meal.creator_email) ||
    !meal.image ||
    meal.image.size === 0 ||
    !meal.creator_email.includes('@')
  ) {
    return {
      message: 'Invalid Input !..',
    };
  }
  await postMeal(meal);
  redirect('/meals');
}