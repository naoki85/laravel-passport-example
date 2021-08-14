import { User } from '../interfaces'
import getRequest from '../lib/http/getRequest'

export type getUserResult = {
  user?: User,
  error: Error | null
}

const getUser = async (token: string): Promise<getUserResult> => {
  try {
    const res = await getRequest('http://localhost:8000/user', {}, {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })

    return {
      user: {
        id: res.user.sub,
        name: res.user.username,
        active: res.user.active,
      },
      error: null
    }
  } catch (error) {
    return {
      error
    }
  }
}

export default getUser