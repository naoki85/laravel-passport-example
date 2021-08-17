import { User } from '../interfaces'
import fetchJson from '../lib/fetchJson'

export type getUserResult = {
  user?: User,
  error: Error | null
}

const getUser = async (token: string): Promise<getUserResult> => {
  try {
    const res = await fetchJson('http://localhost:8000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    console.log(res)

    return {
      user: {
        id: res.user.sub,
        name: res.user.username,
        active: res.user.active,
      },
      error: null
    }
  } catch (error) {
    console.error(error)

    return {
      error
    }
  }
}

export default getUser