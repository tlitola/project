import { userActive } from '@lib/database/User/user'
import { GetServerSidePropsContext } from 'next'
import JWT from '../JWT'
import { validateAuth } from '../validate'

export const protectClientRequest = async (
  ctx: GetServerSidePropsContext
): Promise<boolean> => {
  try {
    validateAuth(ctx.req.cookies)
    const accessToken = await JWT.validate(ctx.req.cookies.accessToken)
    await userActive('id', accessToken.sub)
    return false
  } catch (e) {
    if (!ctx.req.headers.referer) {
      ctx.res.setHeader('location', '/login')
      ctx.res.statusCode = 302
      ctx.res.end()
    }
    return true
  }
}
