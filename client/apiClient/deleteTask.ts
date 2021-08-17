import fetchJson from '../lib/fetchJson'

export type createTaskResult = {
  error: Error | null
}

const deleteTask = async (token: string, id: number): Promise<createTaskResult> => {
  try {
    const res = await fetchJson(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    console.log(res)

    return {
      error: null
    }
  } catch (error) {
    console.error(error)

    return {
      error
    }
  }
}

export default deleteTask