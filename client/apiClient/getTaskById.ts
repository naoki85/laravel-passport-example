import { Task } from '../interfaces'
import fetchJson from '../lib/fetchJson'

export type getTaskByIdResult = {
  task: Task | null,
  error: Error | null
}

const getTaskById = async (token: string, id: number): Promise<getTaskByIdResult> => {
  try {
    const res = await fetchJson(`http://localhost:8000/tasks/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    console.log(res)

    return {
      task: res.task,
      error: null
    }
  } catch (error) {
    console.error(error)

    return {
      task: null,
      error
    }
  }
}

export default getTaskById