import deleteRequest from '../lib/http/deleteRequest'

export type createTaskResult = {
  error: Error | null
}

const deleteTask = async (token: string, id: number): Promise<createTaskResult> => {
  try {
    const res = await deleteRequest('http://localhost:8000/tasks/' + id, {}, {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })

    return {
      error: null
    }
  } catch (error) {
    return {
      error
    }
  }
}

export default deleteTask