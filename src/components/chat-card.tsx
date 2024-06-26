'use client'

import { Chat } from '@prisma/client'
import { Card, CardContent, CardFooter } from './ui/card'
import { useRouter } from 'next/navigation'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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
      className="flex flex-col hover:cursor-pointer hover:bg-primary/10"
      onClick={handleChatSelection}
    >
      <CardContent>
        <h3 className="font-semibold text-start mt-2">{chat.name}</h3>
      </CardContent>
      <CardFooter>
        <p className="font-light">
          expira em:{' '}
          {formatRelative(chat.duration, new Date(), {
            locale: ptBR,
          })}
        </p>
      </CardFooter>
    </Card>
  )
}
