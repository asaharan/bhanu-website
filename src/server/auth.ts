import { createServerFn } from '@tanstack/react-start'
import { getSession, useSession } from '@tanstack/react-start/server'
import { z } from 'zod'

interface AdminSessionData {
  isAdmin: boolean
}

function sessionConfig() {
  const password = process.env.SESSION_SECRET
  if (!password) throw new Error('SESSION_SECRET is not set')
  return { password, name: 'ayg_admin', maxAge: 60 * 60 * 8 }
}

async function constantTimeEqual(a: string, b: string) {
  const { createHash, timingSafeEqual } = await import('node:crypto')
  const digestA = createHash('sha256').update(a).digest()
  const digestB = createHash('sha256').update(b).digest()
  return timingSafeEqual(digestA, digestB)
}

export const getAdminSession = createServerFn({ method: 'GET' }).handler(
  async (): Promise<AdminSessionData> => {
    const session = await getSession<AdminSessionData>(sessionConfig())
    return { isAdmin: session.data.isAdmin === true }
  },
)

export const adminLogin = createServerFn({ method: 'POST' })
  .validator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD
    if (!expected) throw new Error('ADMIN_PASSWORD is not set')

    if (!(await constantTimeEqual(data.password, expected))) {
      throw new Error('Incorrect password')
    }

    const session = await useSession<AdminSessionData>(sessionConfig())
    await session.update({ isAdmin: true })
    return { ok: true as const }
  })

export const adminLogout = createServerFn({ method: 'POST' }).handler(
  async () => {
    const session = await useSession<AdminSessionData>(sessionConfig())
    await session.clear()
    return { ok: true as const }
  },
)
