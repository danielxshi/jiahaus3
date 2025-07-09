'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import logoWhite from '../../app/public/images/logo.png'
import logoBlack from '../../app/public/images/logo-black.png'

interface FirstProps {
  children: React.ReactNode
}

export default function First({ children }: FirstProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const logo = isHome ? logoWhite : logoBlack

  return (
    <div className={`flex items-start gap-8 ${isHome ? '' : ' text-white'}`}>
      <Link
        href="/"
        className="block w-[90px] h-[90px] max-w-[90px] max-h-[90px] min-w-[90px] min-h-[90px] relative mt-1"
      >
        <Image alt="logo" src={logo} fill style={{ objectFit: 'contain', objectPosition: 'top' }} />
      </Link>
      {children}
    </div>
  )
}
