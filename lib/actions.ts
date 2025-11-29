'use server'

import { redirect } from "next/navigation";
import { postMeal } from "./meals";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function shareMeal(formData: any) {
  const meal = {
    title: formData.get('title'),
    image: formData.get('image'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };
    
    await postMeal(meal)
    redirect("/meals")
}