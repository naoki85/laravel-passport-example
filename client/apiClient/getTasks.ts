import { Task } from '../interfaces'
import getRequest from '../lib/http/getRequest'

export type getTasksResult = {
  tasks: Task[],
  error: Error | null
}

const getTasks = async (token: string): Promise<getTasksResult> => {
  try {
    const res = await getRequest('http://localhost:8000/tasks', {}, {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })

    return {
      tasks: res.tasks,
      error: null
    }
  } catch (error) {
    return {
      tasks: [],
      error
    }
  }
}

export default getTasks