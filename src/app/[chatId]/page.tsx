import findChat from '@/actions/find-chat'
import Chat from '@/components/chat'
import { redirect } from 'next/navigation'

type PageProps = {
  params: {
    chatId: string
  }
}

export default async function Page({ params }: PageProps) {
  const chat = await findChat({ chatId: params.chatId })

  if (chat === null) {
    redirect('/')
  }

  return <Chat chat={chat} />
}
