'use client'

import fetchChats from '@/actions/fetch-chats'
import ChatCard from './chat-card'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

export default function Chats() {
  const { data } = useQuery({
    queryKey: ['chats'],
    queryFn: () =>
      fetchChats().catch((error) => {
        toast.error(error.message || 'Erro ao buscar chats')
      }),
  })

  return <>{data?.map((chat, index) => <ChatCard key={index} chat={chat} />)}</>
}
