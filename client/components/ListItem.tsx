import React from 'react'
import Link from 'next/link'

import { Task } from '../interfaces'

type Props = {
  data: Task
}

const ListItem = ({ data }: Props) => (
  <Link href="/tasks/[id]" as={`/tasks/${data.id}`}>
    <a>
      {data.id}: {data.title}
    </a>
  </Link>
)

export default ListItem
