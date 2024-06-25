'use server'

import { prisma } from '@/lib/prisma'

type FindChatProps = {
  chatId: string
}

export default async function findChat({ chatId }: FindChatProps) {
  return await prisma.chat.findFirst({
    where: {
      id: chatId,
    },
  })
}
