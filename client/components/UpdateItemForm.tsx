import * as React from 'react'
import { useState } from 'react'
import putRequest from '../lib/http/putRequest'
import { Task } from '../interfaces'
import Router from 'next/router'

type UpdateItemFormProps = {
  task: Task
}

const UpdateItemForm = ({ task }: UpdateItemFormProps) => {
  const [title, setTitle] = useState<string>(task.title)

  const updateNewTask = async () => {
    try {
      const res = await putRequest('/api/tasks/' + task.id, {title: title})
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
