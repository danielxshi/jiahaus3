import { headers as getHeaders } from 'next/headers.js'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@/payload.config'
import './globals.css'
import LandingClient from './LandingClient'
import Footer from '@/components/footer/footer'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadInstance = await getPayload({ config })

  // Optional: Get authenticated user
  const { user } = await payloadInstance.auth({ headers })

  // ✅ Fetch movies collection from Payload
  const moviesResponse = await payloadInstance.find({
    collection: 'movies',
    limit: 12,
  })

  const movies = moviesResponse.docs

  // Optional: fileURL for VS Code integration
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  // ✅ Pass movies to client component
  return (
    <>
      <LandingClient
        movies={movies.map((movie) => ({
          id: String(movie.id), // convert number → string
          slug: movie.slug || '',
          name: movie.name,
          overview: movie.overview,
          poster:
            typeof movie.poster === 'object' && movie.poster?.url
              ? { url: movie.poster.url }
              : undefined,
        }))}
      />
      {/* <Footer /> */}
    </>
  )
}
