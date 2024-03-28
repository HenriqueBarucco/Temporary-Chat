import { Chat } from '@prisma/client'
import { Card, CardContent } from './ui/card'

type ChatCardProps = {
  chat: Chat
}

export default function ChatCard({ chat }: ChatCardProps) {
  return (
    <Card className="flex items-center h-full">
      <CardContent>
        <h3 className="font-semibold">{chat.name}</h3>
      </CardContent>
    </Card>
  )
}
