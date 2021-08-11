import { Task } from '../interfaces'
import getRequest from '../lib/http/getRequest'

export type getTaskByIdResult = {
  task: Task | null,
  error: Error | null
}

const getTaskById = async (token: string, id: number): Promise<getTaskByIdResult> => {
  try {
    const res = await getRequest('http://localhost:8000/tasks/' + id, {}, {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })

    return {
      task: res.task,
      error: null
    }
  } catch (error) {
    return {
      task: null,
      error
    }
  }
}

export default getTaskById