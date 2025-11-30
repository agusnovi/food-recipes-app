import fs from "node:fs"
import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"
import { S3 } from "@aws-sdk/client-s3"

const s3 = new S3({
  region: 'ap-southeast-2',
})

const db = sql("meals.db")

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    // throw new Error("Loading meals failed!")
    return db.prepare("SELECT * FROM meals").all()
}

export async function getMeal(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error("Loading meal failed!")
  return db.prepare('SELECT * FROM meals WHERE slug=?').get(slug);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postMeal(meal: any) {
  meal.slug = slugify(meal.title, { lower: true })
  meal.instructions = xss(meal.instructions)

  const extention = meal.image.name.split(".").pop()
  const fileName = `${meal.slug}.${extention}`

  const bufferedImage = await meal.image.arrayBuffer()
  
  s3.putObject({
    Bucket: 'food-s3-nextjs-img',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });
  meal.image = fileName

  await new Promise((resolve) => setTimeout(resolve, 5000))
  
  return db.prepare(`
    INSERT INTO meals
      (title, creator, instructions, creator_email, slug, image, summary)
    VALUES 
      (@title, @creator, @instructions, @creator_email, @slug, @image, @summary)
    `).run(meal)
}