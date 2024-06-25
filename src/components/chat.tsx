import { Chat as ChatType, Message } from '@prisma/client'
import SendMessage from './forms/send-message'
import fetchChatMessages from '@/actions/fetch-chat-messages'

export default function Chat({ chat }: { chat: ChatType }) {
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
        <SendMessage chatId={chat.id} />
      </footer>
    </section>
  )
}

async function Messages({ chatId }: { chatId: string }) {
  const messages = await fetchChatMessages({ chatId })

  return (
    <>
      {messages.map((message: Message) => (
        <div key={message.id} className="flex items-end gap-2">
          <div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2 max-w-2xl">
            <p className="font-semibold">{message.user}</p>
            <p className="text-sm break-words">{message.content}</p>
          </div>
        </div>
      ))}
      <div className="flex items-end gap-2 justify-end">
        <div className="rounded-lg bg-blue-500 text-white p-2">
          <p className="text-sm">Bão!</p>
        </div>
      </div>
    </>
  )
}
