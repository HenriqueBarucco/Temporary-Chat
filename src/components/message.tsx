import { cn } from '@/lib/utils'
import useStore from '@/lib/zustand'
import { Message as MessageType, File as FileType } from '@prisma/client'
import { Download } from 'lucide-react'

type MessageWithFile = MessageType & {
  file?: FileType | null
}

type MessageProps = {
  message: MessageWithFile
}

export default function Message({ message }: MessageProps) {
  const { user } = useStore()

  const messageClasses = cn('rounded-lg p-2 max-w-2xl', {
    'bg-blue-500 text-white': message.user === user,
    'bg-zinc-200 dark:bg-zinc-700': message.user !== user,
    'justify-end': message.user === user,
  })

  return (
    <div
      key={message.id}
      className={cn('flex items-end gap-2', {
        'justify-end': message.user === user,
      })}
    >
      <div className={messageClasses}>
        {message.user !== user && (
          <p className="font-semibold">{message.user}</p>
        )}
        <p className="text-sm break-words">{message.content}</p>
        {message.file && (
          <a
            href={message.file.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-light flex items-center mt-2"
          >
            <Download className="mr-2 size-4" />
            {message.file.name}
          </a>
        )}
      </div>
    </div>
  )
}
