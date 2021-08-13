import { Task } from '../interfaces'
import postRequest from '../lib/http/postRequest'

export type createTaskResult = {
  task: Task | null,
  error: Error | null
}

const createTask = async (token: string, title: string): Promise<createTaskResult> => {
  try {
    const res = await postRequest('http://localhost:8000/tasks', {
      'title': title,
    }, {
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

export default createTask