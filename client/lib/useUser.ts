import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

const useUser = ({
  redirectTo = '',
  redirectIfFound = false
} = {}) => {
  const { data: user, mutate: mutateUser } = useSWR('/api/users')

  useEffect(() => {
    if (!redirectTo || !user) return

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectTo, redirectIfFound])

  return { user, mutateUser }
}

export default useUser