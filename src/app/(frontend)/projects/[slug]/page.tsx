import { notFound } from 'next/navigation'

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
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

type PayloadResponse = {
  docs: Project[]
}

/* Next 13 / App-Router page-prop shape */
interface PageProps {
  params: { slug: string }
  /* searchParams can be omitted if unused, but including it
     silences “excess property” errors in strict mode.  */
  searchParams?: Record<string, string | string[]>
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default async function ProjectPage({ params }: PageProps) {
  const slug = encodeURIComponent(params.slug)

  /* Fetch & basic runtime validation -------------------------------- */
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/movies?where[slug][equals]=${slug}`,
    {
      /* Re-render every 10 s (adjust as needed) */
      next: { revalidate: 10 },
    },
  )

  if (!res.ok) notFound()

  const data: PayloadResponse = await res.json()
  const project = data.docs?.[0]

  if (!project) notFound()

  /* View ------------------------------------------------------------ */
  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6 sm:mt-48 md:mt-64">
      {/* Title & tagline */}
      <h1 className="text-3xl font-bold">{project.name}</h1>
      {project.tagline && <p className="text-gray-600">{project.tagline}</p>}

      {/* Overview */}
      <p className="text-lg">{project.overview}</p>

      {/* Genres */}
      <div className="flex flex-wrap gap-2">
        {project.genres.map(({ name }) => (
          <span key={name} className="bg-gray-100 px-2 py-1 rounded text-sm">
            {name}
          </span>
        ))}
      </div>

      {/* Gallery (images or video) */}
      {project.gallery?.length ? (
        <div className="grid grid-cols-1 gap-6 mt-8">
          {project.gallery.map((item, i) => {
            const file = item.image
            if (!file?.mimeType || !file.url) return null

            const isVideo = file.mimeType.startsWith('video/')

            return (
              <div key={i} className="flex flex-col space-y-2">
                {isVideo ? (
                  <video controls className="w-full rounded shadow max-h-[90vh]" src={file.url} />
                ) : (
                  <img
                    src={file.url}
                    alt={file.alt ?? ''}
                    className="w-full rounded shadow object-cover"
                  />
                )}
                {item.caption && <p className="text-sm text-gray-600">{item.caption}</p>}
              </div>
            )
          })}
        </div>
      ) : null}
    </main>
  )
}
