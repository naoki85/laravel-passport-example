import fetchJson from '../lib/fetchJson'
import qs from 'querystring'
import { Session } from 'next-iron-session'

const withRefresh = async (session: Session , args: any, fn: (...args) => Promise<any>): Promise<any> => {
  const accessToken = session.get("access_token")
  const refreshToken = session.get("refresh_token")

  if (accessToken === undefined) return new Error('Unauthorized')

  try {
    let res = await fn(accessToken, args)
    if (res.error) {
      const params = {
        client_id: process.env.OAUTH2_CLIENT_ID,
        client_secret: process.env.OAUTH2_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: '',
      }

      const response = await fetchJson('http://localhost:8080/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify(params),
      })

      session.set("access_token", response.access_token);
      session.set("expired_in", response.expires_in);
      session.set("refresh_token", response.refresh_token);
      await session.save();

      res = await fn(response.access_token, args)
    }

    return res
  } catch (error) {
    console.error(error)

    throw error
  }
}

export default withRefresh