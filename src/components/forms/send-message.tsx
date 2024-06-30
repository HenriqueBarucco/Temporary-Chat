'use client'

import { SmileIcon, Paperclip } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import sendMessage from '@/actions/send-message'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

const sendMessageSchema = z.object({
  message: z.string().min(1, { message: 'Nome do chat é obrigatório' }),
})

type SendMessageSchema = z.infer<typeof sendMessageSchema>

type SendMessageProps = {
  chatId: string
  user: string | null
}

export default function SendMessage({ chatId, user }: SendMessageProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<SendMessageSchema>({
    resolver: zodResolver(sendMessageSchema),
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  
  async function handleSendMessage({ message }: SendMessageSchema) {
    if (!user) {
      toast.error('Você não está com o seu nome definido.')
      return
    }
    await sendMessage({ message, chatId, user })
  }

  function handleSelectFile() {
    if (!fileInputRef.current) {
      return
    }
    fileInputRef.current.click()
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files!
    if (isInvalidFile(file)) {
      toast.error('Selecione Somente um Arquivo.')
      return
    }
    handleUploadFile(file[0])
  }

  function isInvalidFile(files:FileList ) {
    return files.length != 1
  }
  
  function handleUploadFile(file: File | null) {
    toast.info('Enviando arquivo...')
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ message: '' })
    }
  }, [isSubmitSuccessful, reset])

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleSendMessage)}
    >
      <Button size="icon" variant="ghost">
        <SmileIcon className="w-6 h-6" />
      </Button>
      <Button onClick={handleSelectFile} size='icon' variant="ghost">
        <Paperclip className="w-6 h-6" />
      </Button>
      <Input
        className="flex-1"
        placeholder="Type a message..."
        {...register('message')}
      />
      <Input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button type="submit">Enviar</Button>
    </form>
  )
}
