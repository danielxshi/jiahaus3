// lib/getMovies.ts
export async function getMovies() {
  const res = await fetch(`${process.env.PAYLOAD_API_URL}/api/movies?limit=12`, {
    headers: {
      Authorization: `Bearer ${process.env.PAYLOAD_API_KEY}`,
    },
    next: { revalidate: 60 }, // optional caching
  })

  if (!res.ok) throw new Error('Failed to fetch movies')

  const data = await res.json()
  return data.docs
}
