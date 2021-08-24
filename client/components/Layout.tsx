import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import useUser from '../lib/useUser'

type Props = {
  children?: ReactNode
  title?: string
  isLoggedIn: boolean
}

const Layout = ({ children, title = 'This is the default title', isLoggedIn = false }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <a href={'http://localhost:8081/about'}>About</a>{' '}
          |{' '}
          <Link href="/tasks">
            <a>Tasks List</a>
          </Link>
          {isLoggedIn && (
            <>
              |{' '}
              <Link href={'http://localhost:8080/logout'}>
                <a>Logout</a>
              </Link>
            </>
          )}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}

export default Layout
