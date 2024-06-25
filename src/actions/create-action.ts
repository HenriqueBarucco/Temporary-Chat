'use server'

import { prisma } from '@/lib/prisma'

type CreateChatProps = {
  name: string
}

export default async function createChat({ name }: CreateChatProps) {
  return await prisma.chat.create({
    data: {
      name,
      duration: new Date(),
    },
  })
}
