import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import ChatCard from '@/components/chat-card'
import Message from '@/components/message'
import { prisma } from '@/lib/prisma'

export default async function Component() {
  const chats = async () => {
    const chats = prisma.chat.findMany()
    return chats
  }

  return (
    <div key="1" className="flex h-screen bg-white dark:bg-zinc-800">
      <aside className="w-80 border-r dark:border-zinc-700">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Temporary Chat</h2>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <Input
              className="pl-8"
              placeholder="Buscar chats..."
              type="search"
            />
            <Button
              className="absolute right-2.5 top-3"
              size="icon"
              variant="ghost"
            />
          </div>
          <div className="space-y-2">
            {(await chats()).map((chat, index) => (
              <ChatCard key={index} chat={chat} />
            ))}
          </div>
        </div>
      </aside>
      <Message />
    </div>
  )
}
