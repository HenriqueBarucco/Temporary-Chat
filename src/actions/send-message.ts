'use server'

import { prisma } from '@/lib/prisma'

type SendMessageProps = {
  chatId: string
  message: string
}

export default async function sendMessage({
  chatId,
  message,
}: SendMessageProps) {
  await prisma.message.create({
    data: {
      chatId,
      content: message,
      user: 'Henrique',
    },
  })
}
