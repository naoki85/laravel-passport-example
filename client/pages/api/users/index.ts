import withSession from '../../../lib/session'
import getUser from '../../../apiClient/getUser'
import withRefresh from '../../../apiClient/withRefresh'

const handler = withSession(async (req, res) => {
  try {
    const method = req.method

    if (method === 'GET') {
      const response = await withRefresh(req.session, {}, getUser)
      if (response.error) {
        res.status(400).json({ user: response.user, message: response.error.message, statusCode: 400 })
      } else {
        res.status(200).json({ user: response.user, message: 'success', statusCode: 200 })
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed', statusCode: 405 })
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
})

export default handler
