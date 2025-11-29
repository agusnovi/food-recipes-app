import fs from "node:fs"
import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"

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

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferedImage = await meal.image.arrayBuffer()
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("failed")
    }
  })

  meal.image = `/images/${fileName}`;

  await new Promise((resolve) => setTimeout(resolve, 5000))
  
  return db.prepare(`
    INSERT INTO meals
      (title, creator, instructions, creator_email, slug, image, summary)
    VALUES 
      (@title, @creator, @instructions, @creator_email, @slug, @image, @summary)
    `).run(meal)
}