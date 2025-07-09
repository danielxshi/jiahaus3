// storage-adapter-import-placeholder
import path from 'path'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ProjectCollections } from './app/collections/project'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  /* ─────────────────── Admin UI ─────────────────── */
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) }, // keep dynamic imports working
  },

  /* ─────────────────── Collections ───────────────── */
  collections: [Users, Media, ProjectCollections],

  /* ─────────────────── Core options ─────────────── */
  secret: process.env.PAYLOAD_SECRET || '',
  editor: lexicalEditor(),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },

  /* ─────────────────── Database ──────────────────── */
  db: vercelPostgresAdapter({
    pool: { connectionString: process.env.POSTGRES_URL || '' },
  }),

  /* ─────────────────── Plugins ───────────────────── */
  plugins: [
    payloadCloudPlugin(), // keep cloud features
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { [Media.slug]: true }, // enable for Media only
            token: process.env.BLOB_READ_WRITE_TOKEN,
            clientUploads: true, // ← REQUIRED to inject UploadHandlersProvider
          }),
        ]
      : []),
  ],

  /* ─────────────────── Optional ───────────────────── */
  sharp, // enable image transforms
})
