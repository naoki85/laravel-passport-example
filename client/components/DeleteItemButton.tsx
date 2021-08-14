import * as React from 'react'
import deleteRequest from '../lib/http/deleteRequest'

const DeleteItemButton = ({ id }) => {
  const deleteTaskFunc = async () => {
    try {
      const res = await deleteRequest('/api/tasks/delete/' + id, {})
      console.log(res)
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
