import '../style/globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Omote-bike',
  description: 'Omotesando House Bike sharing app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <nav className='navig'>
          <Link href="/">
            <button className='p-5'>Home</button>
          </Link>
          <Link href="/rules">
            <button className='p-5'>Rules</button>
          </Link>
          <Link href="/history">
            <button className='p-5'>History</button>
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
