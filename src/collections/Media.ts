import type { CollectionConfig } from 'payload'
import s3Adapter from 'payload-s3-upload'

// ---- S3 adapter ----------------------------------------------------
const s3UploadAdapter = s3Adapter({
  bucket: process.env.S3_BUCKET ?? '',
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
    },
    region: process.env.S3_REGION ?? '',
  },
} as any) // 👈 cast to any to avoid TS mismatch with AWS SDK types
// --------------------------------------------------------------------

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    disableLocalStorage: true,
    adapter: s3UploadAdapter as any, // 👈 Payload expects string but accepts object at runtime
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ],
    // must return string | false | null
    adminThumbnail: ({ doc }: any) => (doc?.url as string) ?? '',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
