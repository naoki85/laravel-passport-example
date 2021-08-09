import Link from 'next/link'
import { Task } from '../../interfaces'
import { sampleTaskData } from '../../utils/sample-data'
import Layout from '../../components/Layout'
import List from '../../components/List'
import withSession from '../../lib/session'

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
  console.log(accessToken)

  if (accessToken === undefined) {
    res.setHeader("location", "/")
    res.statusCode = 302
    res.end()
    return { props: { tasks: [] } }
  }

  const tasks: Task[] = sampleTaskData

  return {
    props: { tasks: tasks },
  }
})

export default SsrTasksIndex
