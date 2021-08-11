import { Task } from '../../interfaces'
import Layout from '../../components/Layout'
import ListDetail from '../../components/ListDetail'
import withSession from '../../lib/session'
import getTaskById from '../../apiClient/getTaskById'

type Props = {
  task?: Task
  errors?: string
}

const SsrTaskDetail = ({ task, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      title={`${
        task ? task.title : 'User Detail'
      } | Next.js + TypeScript Example`}
    >
      {task && <ListDetail item={task} />}
    </Layout>
  )
}

export default SsrTaskDetail

export const getServerSideProps = withSession(async ({ req, res, query }) => {
  const accessToken = req.session.get("access_token")

  if (accessToken === undefined) {
    res.setHeader("location", "/")
    res.statusCode = 302
    res.end()
    return { props: { tasks: [] } }
  }

  const id = query?.id
  const response = await getTaskById(accessToken, Number(id))

  return {
    props: { task: response.task, errors: response.error?.message || null },
  }
})
