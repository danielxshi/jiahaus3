// app/layout.tsx (server component)
import './globals.css'
import Navbar from '@/components/navbar/navbar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="max-w-full overflow-x-hidden" lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
