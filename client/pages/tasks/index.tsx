import Link from 'next/link'
import { Task } from '../../interfaces'
import Layout from '../../components/Layout'
import List from '../../components/List'
import withSession from '../../lib/session'
import getTasks from '../../apiClient/getTasks'
import NewItemForm from '../../components/NewItemForm'
import useUser from '../../lib/useUser'

type Props = {
  tasks: Task[]
}

const SsrTasksIndex = (props: Props) => {
  const { user } = useUser()

  return (
    <Layout title="Users List | Next.js + TypeScript Example" isLoggedIn={!!user}>
      <h1>Tasks List</h1>
      <div>
        <NewItemForm />
      </div>
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
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const response = await getTasks(accessToken)

  return {
    props: { tasks: response.tasks },
  }
})

export default SsrTasksIndex
