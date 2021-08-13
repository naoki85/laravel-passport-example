import withSession from '../../../lib/session'
import createTask from '../../../apiClient/createTask'

const handler = withSession(async (req, res) => {
  try {
    const accessToken = req.session.get("access_token")

    if (accessToken === undefined) {
      res.status(401).json({ task: {}, message: 'Unauthorized', statusCode: 401 })
      return
    }

    const title = req.body.title
    const response = await createTask(accessToken, title)

    if (response.error) {
      res.status(400).json({ task: {}, message: response.error.message, statusCode: 400 })
    } else {
      res.status(200).json({ task: response.task, message: 'success', statusCode: 200 })
    }
  } catch (err) {
    res.status(500).json({ task:{}, statusCode: 500, message: err.message })
  }
})

export default handler
