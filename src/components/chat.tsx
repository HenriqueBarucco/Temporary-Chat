'use client'

import { Chat as ChatType, Message as MessageType } from '@prisma/client'
import SendMessage from './forms/send-message'
import fetchChatMessages from '@/actions/fetch-chat-messages'
import { useQuery } from '@tanstack/react-query'
import useStore from '@/lib/zustand'
import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'
import Message from './message'

export default function Chat({ chat }: { chat: ChatType }) {
  const { user } = useStore()

  return (
    <section className="flex flex-col w-full">
      <header className="border-b dark:border-zinc-700 p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          {chat.name}
        </h2>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          <Messages chatId={chat.id} />
        </div>
      </main>
      <footer className="border-t dark:border-zinc-700 p-4">
        <SendMessage chatId={chat.id} user={user} />
      </footer>
    </section>
  )
}

function Messages({ chatId }: { chatId: string }) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false)

  const { data } = useQuery({
    queryKey: ['messages', chatId],
    queryFn: () =>
      fetchChatMessages({ chatId }).catch((error) => {
        toast.error(error.message || 'Erro ao carregar mensagens')
      }),
    staleTime: 1000,
    refetchInterval: 1000,
  })

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'instant' })
    }
  }

  useEffect(() => {
    if (data && !initialLoadCompleted) {
      scrollToBottom()
      setInitialLoadCompleted(true)
    }
  }, [data, initialLoadCompleted])

  return (
    <>
      {data?.map((message: MessageType) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </>
  )
}
