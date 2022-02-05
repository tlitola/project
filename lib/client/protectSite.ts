import { NextRouter } from 'next/router'
import { toast } from 'react-toastify'

export const protectSite = (
  redirect: string | undefined,
  router: NextRouter
): void => {
  if (redirect) {
    toast.error('You need to log in to visit that page')
    router.push(redirect)
  }
}
