import { Task } from '../../interfaces'
import Layout from '../../components/Layout'
import ListDetail from '../../components/ListDetail'
import withSession from '../../lib/session'
import getTaskById from '../../apiClient/getTaskById'
import DeleteItemButton from '../../components/DeleteItemButton'
import { useState } from 'react'
import UpdateItemForm from '../../components/UpdateItemForm'
import useUser from '../../lib/useUser'

type Props = {
  task?: Task
  errors?: string
}

const SsrTaskDetail = ({ task, errors }: Props) => {
  const { user } = useUser()
  const [editMode, setEditMode] = useState<boolean>(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example" isLoggedIn={!!user}>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      title={`${
        task ? task.title : 'Task Detail'
      } | Next.js + Laravel Passport Example`}
      isLoggedIn={!!user}
    >
      {task && <ListDetail item={task} />}
      {editMode ? (
        <>
          {task && <UpdateItemForm task={task} />}
          <button onClick={toggleEditMode}>戻る</button>
        </>
      ) : (
        <>
          <button onClick={toggleEditMode}>編集</button>
          <DeleteItemButton id={task.id} />
        </>
      )}
      <>
      </>

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
