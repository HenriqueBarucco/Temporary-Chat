'use server'

import { prisma } from '@/lib/prisma'

type CreateChatProps = {
  name: string
}

export default async function createChat({ name }: CreateChatProps) {
  const currentDate = new Date()
  const duration = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24 * 7) // 7 days
  return await prisma.chat.create({
    data: {
      name,
      duration,
    },
  })
}
