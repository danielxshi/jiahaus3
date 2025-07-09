import { notFound } from 'next/navigation'

type Project = {
  name: string
  slug: string
  url: string
  overview: string
  tagline?: string
  votes: number
  genres: { name: string }[]
  poster: {
    url: string
    alt: string
    mimeType: string
  }
  gallery?: {
    image?: {
      url: string
      alt: string
      mimeType: string
    }
    caption?: string
  }[]
}

export default async function ProjectPage({ params }: any) {
  // Fallback to `any` to remove strict constraint issues for now
  const slug = params.slug

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/movies?where[slug][equals]=${slug}`,
    {
      next: { revalidate: 10 },
    },
  )

  if (!res.ok) notFound()

  const data = await res.json()
  const project: Project | undefined = data?.docs?.[0]

  if (!project) notFound()

  const gallery = project.gallery ?? []

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6 sm:mt-48 md:mt-64">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      {project.tagline && <p className="text-gray-600">{project.tagline}</p>}
      <p className="text-lg">{project.overview}</p>

      <div className="flex flex-wrap gap-2">
        {project.genres.map((g, i) => (
          <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
            {g.name}
          </span>
        ))}
      </div>

      {gallery.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mt-8">
          {gallery.map((item, i) => {
            const file = item.image
            if (!file || !file.mimeType || !file.url) return null

            const isVideo = file.mimeType.startsWith('video/')

            return (
              <div key={i} className="flex flex-col space-y-2">
                {isVideo ? (
                  <video controls className="w-full rounded shadow max-h-[90vh]">
                    <source src={file.url} type={file.mimeType} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={file.url}
                    alt={file.alt || ''}
                    className="w-full rounded shadow object-cover"
                  />
                )}
                {item.caption && <p className="text-sm text-gray-600">{item.caption}</p>}
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

// Fixes PageProps inference
export async function generateStaticParams() {
  return []
}
