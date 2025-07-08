// app/about/page.tsx

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-12 py-24 flex flex-col gap-12">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          We’re not just shooters or editors.
          <br /> We’re visual storytellers. Framers of feeling.
        </h1>
      </section>

      <section className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-700">
        <p className="mb-6">
          JIAHAUS is a media company focused on creating photo and video content that moves people.
          We believe the right frame, the right moment, the right mood — can shift perception and
          spark connection.
        </p>
        <p className="mb-6">
          Led by Daniel Shi, we partner with individuals, brands, and businesses to craft compelling
          visuals that resonate — from campaign storytelling to lifestyle visuals to branded
          docu-style work.
        </p>
        <p className="mb-6">
          Whether it's a single portrait or a full-scale video production, we approach every project
          with clarity, curiosity, and craft.
        </p>
      </section>

      <section className="max-w-3xl mx-auto text-gray-900">
        <h2 className="text-2xl font-medium mb-4">What We Do</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Portrait & Lifestyle Photography</li>
          <li>Commercial & Branded Video</li>
          <li>Event & On-location Shoots</li>
          <li>Studio & Product Content</li>
          <li>Short-form Vertical Video (Reels / TikTok / YouTube Shorts)</li>
        </ul>
      </section>

      <section className="max-w-3xl mx-auto mt-16 text-lg text-gray-700 *:text-center">
        <p>
          Let’s create something cinematic —{' '}
          <a href="/contact" className="underline hover:text-black transition">
            get in touch
          </a>
          .
        </p>
        <p>danielxshi@hotmail.com</p>
        <p>604-551-1548</p>
      </section>
    </div>
  )
}
