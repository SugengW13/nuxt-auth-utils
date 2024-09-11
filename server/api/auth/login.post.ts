import prisma from "~/lib/prisma"
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { addDays, getUnixTime } from "date-fns"
import { resultOK, resultError } from "~/server/utils/handle-response"

export default defineEventHandler(handleAsync(async (event) => {
  const { email, password } = await readBody(event)

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) throw resultError(400, 'Invalid email or password')

  const isValidPassword = await compare(password, user.password)

  if (!isValidPassword) throw resultError(400, 'Invalid email or password')

  const token = jwt.sign({
    sub: user.id,
    email: user.email,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(addDays(new Date(), 1))
  }, process.env.JWT_SECRET_KEY ?? 'SECRET_KEY')

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { token }
  })

  const { password: _password, ...noPasswordUser } = updatedUser

  await setUserSession(event, {
    user: { ...noPasswordUser }
  })

  return resultOK({ ...noPasswordUser })
}))