// app/layout.tsx (server component)
import './globals.css'
import Navbar from '@/components/navbar/navbar'
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="" lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="mb-48 overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
