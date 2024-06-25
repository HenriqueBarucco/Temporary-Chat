'use client'

import { Chat } from '@prisma/client'
import { Card, CardContent } from './ui/card'
import { useRouter } from 'next/navigation'

type ChatCardProps = {
  chat: Chat
}

export default function ChatCard({ chat }: ChatCardProps) {
  const route = useRouter()

  const handleChatSelection = () => {
    route.push(`/${chat.id}`)
  }

  return (
    <Card
      className="flex items-center h-full hover:cursor-pointer hover:bg-primary/10"
      onClick={handleChatSelection}
    >
      <CardContent>
        <h3 className="font-semibold">{chat.name}</h3>
      </CardContent>
    </Card>
  )
}
