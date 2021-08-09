import * as React from 'react'

import { Task } from '../interfaces'

type ListDetailProps = {
  item: Task
}

const ListDetail = ({ item: task }: ListDetailProps) => (
  <div>
    <h1>Detail for {task.title}</h1>
    <p>ID: {task.id}</p>
  </div>
)

export default ListDetail
