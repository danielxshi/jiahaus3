import type { CollectionConfig } from 'payload'
import s3Adapter from 'payload-s3-upload'
import { S3Client } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.S3_REGION || '',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
})

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    disableLocalStorage: true,
    adapter: s3Adapter({
      client: s3Client,
      bucket: process.env.S3_BUCKET || '',
    }) as unknown as string,
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ],
    adminThumbnail: ({ doc }) => doc?.url || '',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
