// app/layout.tsx (server component)
import './globals.css'
import Navbar from '@/components/navbar/navbar'
export const metadata = {
  description:
    'A media company that offers brands, businesses, and people to bring projects to life through art, design, and technology.',
  title: 'JIAHAUS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="" lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="mb-48 overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
