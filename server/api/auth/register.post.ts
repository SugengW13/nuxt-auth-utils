import { hash } from 'bcrypt'
import prisma from '~/lib/prisma'
import { handleAsync } from '~/server/utils/handle-async'
import { resultError } from '~/server/utils/handle-response'
import { resultCreated } from '~/server/utils/handle-response'

export default defineEventHandler(handleAsync(async (event) => {
  const { email, password, passwordConfirmation } = await readBody(event)

  if (!email || !password || !passwordConfirmation)
    throw resultError(400, 'All fields are required')

  if (password !== passwordConfirmation)
    throw resultError(400, 'Password must match')

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hashedPassword }
  })

  const { password: _password, ...noPasswordUser } = user

  await clearUserSession(event)

  return resultCreated({ ...noPasswordUser })
}))