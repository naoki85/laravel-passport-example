import { NextApiRequest, NextApiResponse } from 'next'
import { Session, withIronSession } from 'next-iron-session'

export type RequestQuery = { [key: string]: string | string[] }
export type NextIronRequest = NextApiRequest & { session: Session }
export type NextIronHandlerParams = {
  req: NextIronRequest,
  res: NextApiResponse,
  query?: RequestQuery,
}
export type NextIronHandler = (NextIronHandlerParams) => void | Promise<void> | Promise<any>
export type ExpressIronHandler = (NextIronRequest, NextApiResponse) => void | Promise<void>

const withSession = (handler: NextIronHandler | ExpressIronHandler) =>
  withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'sample-passport-client',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    }
  })

export default withSession