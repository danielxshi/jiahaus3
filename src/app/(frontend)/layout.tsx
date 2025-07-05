import React from 'react'
import './globals.css'
import Navbar from '@/components/navbar/navbar'
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className="dark mx-auto max-w-[1280px]" lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
