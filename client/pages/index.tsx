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
        const response = await fetchJson('/api/users')
        setUser(response.user)
      } catch (err) {
        console.error(err)
        setUser(null)
      }
    })()
  }, [])

  return (
    <Layout title="Home | Next.js + Laravel Passport Example">
      {user ? (
        <h1>{`Hello ${user.name} 👋`}</h1>
      ) : (
        <p>Loading</p>
      )}
    </Layout>
  )
}

export default IndexPage
