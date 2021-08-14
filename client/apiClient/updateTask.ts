import { Task } from '../interfaces'
import putRequest from '../lib/http/putRequest'

export type createTaskResult = {
  task: Task | null,
  error: Error | null
}

const createTask = async (token: string, id: number, title: string): Promise<createTaskResult> => {
  try {
    const res = await putRequest('http://localhost:8000/tasks/' + id, {
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