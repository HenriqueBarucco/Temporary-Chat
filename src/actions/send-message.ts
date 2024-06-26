'use server'

import { prisma } from '@/lib/prisma'

type SendMessageProps = {
  chatId: string
  message: string
  user: string
}

export default async function sendMessage({
  chatId,
  message,
  user,
}: SendMessageProps) {
  await prisma.message.create({
    data: {
      chatId,
      content: message,
      user,
    },
  })
}
