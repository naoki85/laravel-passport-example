import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { User } from '../interfaces'
import fetchJson from '../lib/fetchJson'
import Link from 'next/link'

const IndexPage = () => {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    (async function () {
      try {
        setLoading(true)
        const response = await fetchJson('/api/users')
        setUser(response.user)
      } catch (err) {
        console.error(err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Layout title="Home | Next.js + Laravel Passport Example">
      {loading && (
        <p>Loading</p>
      )}
      {user ? (
        <h1>{`Hello ${user.name} 👋`}</h1>
      ) : (
        <p>
          You are not logged in.&nbsp;
          <Link href={'/auth/authorize'}>
            <a>Please login</a>
          </Link>
        </p>
      )}
    </Layout>
  )
}

export default IndexPage
