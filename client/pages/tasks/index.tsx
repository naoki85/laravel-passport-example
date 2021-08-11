import Link from 'next/link'
import { Task } from '../../interfaces'
import Layout from '../../components/Layout'
import List from '../../components/List'
import withSession from '../../lib/session'
import getTasks from '../../apiClient/getTasks'

type Props = {
  tasks: Task[]
}

const SsrTasksIndex = (props: Props) => {
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Tasks List</h1>
      <p>
        Example fetching data from inside <code>getStaticProps()</code>.
      </p>
      <p>You are currently on: /users</p>
      <List items={props.tasks} />
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  )
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const accessToken = req.session.get("access_token")

  if (accessToken === undefined) {
    res.setHeader("location", "/")
    res.statusCode = 302
    res.end()
    return { props: { tasks: [] } }
  }

  const response = await getTasks(accessToken)

  return {
    props: { tasks: response.tasks },
  }
})

export default SsrTasksIndex
