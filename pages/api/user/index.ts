import { pick } from 'lodash'
import authHandler from '../_authHandler'

const handler = authHandler().get(async (req, res) => {
  res.status(200).json({
    user: { ...pick(req.user, ['id', 'email', 'first_name', 'last_name']) },
  })
})

export default handler
