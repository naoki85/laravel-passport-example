import withSession from '../../../../lib/session'
import deleteTask from '../../../../apiClient/deleteTask'

const handler = withSession(async (req, res) => {
  try {
    const accessToken = req.session.get("access_token")

    if (accessToken === undefined) {
      res.status(401).json({ task: {}, message: 'Unauthorized', statusCode: 401 })
      return
    }

    const id = req.query.id
    const response = await deleteTask(accessToken, Number(id))

    if (response.error) {
      res.status(400).json({ message: response.error.message, statusCode: 400 })
    } else {
      res.status(200).json({ message: 'success', statusCode: 200 })
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
})

export default handler
