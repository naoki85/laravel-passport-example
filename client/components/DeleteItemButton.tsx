import * as React from 'react'
import Router from 'next/router'
import fetchJson from '../lib/fetchJson'

const DeleteItemButton = ({ id }) => {
  const deleteTaskFunc = async () => {
    try {
      const res = await fetchJson(`/api/tasks/delete/${id}`)
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
