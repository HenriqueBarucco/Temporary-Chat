import { SmileIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Message() {
  return (
    <section className="flex flex-col w-full">
      <header className="border-b dark:border-zinc-700 p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Chat legal
        </h2>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          <MessageItem />
        </div>
      </main>
      <footer className="border-t dark:border-zinc-700 p-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <SmileIcon className="w-6 h-6" />
          </Button>
          <Input className="flex-1" placeholder="Type a message..." />
          <Button>Send</Button>
        </div>
      </footer>
    </section>
  )
}

function MessageItem() {
  return (
    <>
      <div className="flex items-end gap-2">
        <div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2">
          <p className="text-sm">Hello, how are you?</p>
        </div>
      </div>
      <div className="flex items-end gap-2 justify-end">
        <div className="rounded-lg bg-blue-500 text-white p-2">
          <p className="text-sm">Bão!</p>
        </div>
      </div>
    </>
  )
}
