import Layout from '../../components/Layout'
import withSession from '../../lib/session'
import qs from 'querystring'

const AuthCallback = () => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Loading...</h1>
  </Layout>
)

export const getServerSideProps = withSession(async ({ req, res, query }) => {
  const params = {
    client_id: '',
    client_secret: '',
    code: query.code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:3000/auth/callback',
  }
  // console.log(params)
  const response = await fetch('http://localhost:8080/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: qs.stringify(params),
  })

  console.log(response.status)
  const resJson = await response.json()
  console.log(resJson)
  req.session.set("access_token", resJson.access_token);
  req.session.set("expired_in", resJson.expires_in);
  req.session.set("refresh_token", resJson.refresh_token);
  await req.session.save();
  res.setHeader("location", "/")
  res.statusCode = 302
  res.end()
  return { props: {} }
})

export default AuthCallback
