import * as React from 'react'
import { useState } from 'react'
import { Task } from '../interfaces'
import Router from 'next/router'
import fetchJson from '../lib/fetchJson'

type UpdateItemFormProps = {
  task: Task
}

const UpdateItemForm = ({ task }: UpdateItemFormProps) => {
  const [title, setTitle] = useState<string>(task.title)

  const updateNewTask = async () => {
    try {
      const res = await fetchJson(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title: title})
      })
      console.log(res)

      Router.push('/tasks')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <input type={'text'} onChange={(e) => setTitle(e.target.value)} value={title} />
      <button onClick={updateNewTask}>更新</button>
    </>
  )
}

export default UpdateItemForm
