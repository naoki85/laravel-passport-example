import withSession from '../../../lib/session'
import updateTask from '../../../apiClient/updateTask'

const handler = withSession(async (req, res) => {
  try {
    const accessToken = req.session.get("access_token")

    if (accessToken === undefined) {
      res.status(401).json({ task: {}, message: 'Unauthorized', statusCode: 401 })
      return
    }

    const method = req.method
    console.log(method)
    if (method === 'PUT') {
      const id = req.query.id
      const title = req.body.title
      const response = await updateTaskAction(accessToken, Number(id), title)
      if (response.error) {
        res.status(400).json({ task: response.task, message: response.error.message, statusCode: 400 })
      } else {
        res.status(200).json({ task: {}, message: 'success', statusCode: 200 })
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed', statusCode: 405 })
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
})

export default handler

const updateTaskAction = async (token: string, id: number, title: string) => {
  return await updateTask(token, id, title)
}
