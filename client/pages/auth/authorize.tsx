import Layout from '../../components/Layout'
import withSession from '../../lib/session'
import generateRandomString from '../../lib/generateRandomString'
import buildUrlQuery from '../../lib/buildUrlQuery'

const AuthAuthorize = () => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Loading...</h1>
  </Layout>
)

export const getServerSideProps = withSession(async ({ req, res }) => {
  const state = generateRandomString()
  req.session.set('state', state)
  await req.session.save()

  const params = {
    client_id: process.env.OAUTH2_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/auth/callback',
    response_type: 'code',
    scope: '',
    state: state,
  }

  const query = buildUrlQuery(params)
  const url = `http://localhost:8080/oauth/authorize?${query}`
  console.log(`redirect to ${url}`)
  return {
    redirect: {
      destination: url,
        permanent: false,
    }
  }
})

export default AuthAuthorize
