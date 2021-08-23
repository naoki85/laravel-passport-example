import Layout from '../components/Layout'
import Link from 'next/link'
import useUser from '../lib/useUser'

const IndexPage = () => {
  const { user } = useUser()

  return (
    <Layout title="Home | Next.js + Laravel Passport Example">
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
