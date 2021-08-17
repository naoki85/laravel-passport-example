import * as React from 'react'
import { useState } from 'react'
import fetchJson from '../lib/fetchJson'
import qs from 'querystring'

const NewItemForm = () => {
  const [title, setTitle] = useState<string>('')

  const createNewTask = async () => {
    try {
      const res = await fetchJson('/api/tasks/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify({ title: title })
      })
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
