'use client'

import { SmileIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import sendMessage from '@/actions/send-message'
import { useEffect } from 'react'
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

  async function handleSendMessage({ message }: SendMessageSchema) {
    if (!user) {
      toast.error('Você não está com o seu nome definido.')
      return
    }
    await sendMessage({ message, chatId, user })
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
      <Input
        className="flex-1"
        placeholder="Type a message..."
        {...register('message')}
      />
      <Button type="submit">Enviar</Button>
    </form>
  )
}
