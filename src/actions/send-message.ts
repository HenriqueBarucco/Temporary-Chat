'use server'

import { prisma } from '@/lib/prisma'

type SendMessageProps = {
  chatId: string
  message: string
  user: string
  file?: {
    url: string
    name: string
  }
}

export default async function sendMessage({
  chatId,
  message,
  user,
  file,
}: SendMessageProps) {
  await prisma.$transaction(async (tx) => {
    let fileId: string | null = null

    if (file) {
      const createdFile = await tx.file.create({
        data: {
          url: file.url,
          name: file.name,
        },
      })
      fileId = createdFile.id
    }

    await tx.message.create({
      data: {
        chatId,
        content: message,
        user,
        fileId,
      },
    })
  })
}
