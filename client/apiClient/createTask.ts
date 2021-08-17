import { Task } from '../interfaces'
import fetchJson from '../lib/fetchJson'

export type createTaskResult = {
  task: Task | null,
  error: Error | null
}

const createTask = async (token: string, title: string): Promise<createTaskResult> => {
  try {
    const res = await fetchJson('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({title: title})
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

export default createTask