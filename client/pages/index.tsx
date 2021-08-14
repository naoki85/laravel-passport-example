import Link from 'next/link'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { User } from '../interfaces'
import fetchJson from '../lib/fetchJson'

const IndexPage = () => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    (async function () {
      try {
        console.log('hogehoge')
        const response = await fetchJson('/api/users')
        console.log(response)
        setUser(response.user)
      } catch (err) {
        console.error(err)
        setUser(null)
      }
    })()
  }, [])

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {user && (
        <h1>{`Hello ${user.name} 👋`}</h1>
      )}
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
