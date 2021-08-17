import { Task } from '../interfaces'
import fetchJson from '../lib/fetchJson'

export type getTasksResult = {
  tasks: Task[],
  error: Error | null
}

const getTasks = async (token: string): Promise<getTasksResult> => {
  try {
    const res = await fetchJson('http://localhost:8000/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    console.log(res)

    return {
      tasks: res.tasks,
      error: null
    }
  } catch (error) {
    console.error(error)

    return {
      tasks: [],
      error
    }
  }
}

export default getTasks