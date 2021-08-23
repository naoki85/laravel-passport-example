import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { User } from '../interfaces'

const useUser = ({
  redirectTo = '',
  redirectIfFound = false
} = {}) => {
  const { data: data, mutate: mutateUser } = useSWR('/api/users')
  let user: User
  if (data && data.user) {
    user = data.user
  }

  useEffect(() => {
    if (!redirectTo || !user) return

    if (
      (redirectTo && !redirectIfFound && !user?.id) ||
      (redirectIfFound && user?.id)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectTo, redirectIfFound])

  return { user, mutateUser }
}

export default useUser