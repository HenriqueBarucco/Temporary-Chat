'use server'

import { prisma } from '@/lib/prisma'

type FetchChatMessagesProps = {
  chatId: string
}

export default async function fetchChatMessages({
  chatId,
}: FetchChatMessagesProps) {
  return await prisma.message.findMany({
    where: {
      chatId,
    },
  })
}
