import Link from "next/link"
import React from 'react'

export const Navigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className='flex items-center flex-wrap bg-green-300 p-3'>
        <Link href=''>
          <a>
            <p>foo</p>
          </a>
        </Link>

        <Link href=''>
          <a>
            <p>bar</p>
          </a>
        </Link>
      </nav>

      {children}
    </div >
  )
}