
export default async function MealsSlugPages({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return (
        <h3>Slug : {slug}</h3>
    )
}