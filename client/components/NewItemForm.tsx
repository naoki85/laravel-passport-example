import * as React from 'react'
import { useState } from 'react'
import postRequest from '../lib/http/postRequest'

const NewItemForm = () => {
  const [title, setTitle] = useState<string>('')

  const createNewTask = async () => {
    try {
      const res = await postRequest('/api/tasks/create', {title: title})
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <input type={'text'} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={createNewTask}>登録</button>
    </>
  )
}

export default NewItemForm
