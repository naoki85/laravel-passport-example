import * as React from 'react'
import deleteRequest from '../lib/http/deleteRequest'
import Router from 'next/router'

const DeleteItemButton = ({ id }) => {
  const deleteTaskFunc = async () => {
    try {
      const res = await deleteRequest('/api/tasks/delete/' + id, {})
      console.log(res)
      Router.push('/tasks')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <button onClick={deleteTaskFunc}>削除</button>
    </>
  )
}

export default DeleteItemButton
