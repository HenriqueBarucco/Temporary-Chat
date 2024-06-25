'use server'

import { prisma } from '@/lib/prisma'

export default async function fetchChats() {
  return await prisma.chat.findMany()
}
