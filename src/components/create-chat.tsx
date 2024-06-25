'use client'

import { PlusIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import createChat from '@/actions/create-action'

const createChatSchema = z.object({
  name: z.string().min(1, { message: 'Nome do chat é obrigatório' }),
})

type CreateChatSchema = z.infer<typeof createChatSchema>

export default function CreateChat() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatSchema>({
    resolver: zodResolver(createChatSchema),
  })

  async function handleCreateChat({ name }: CreateChatSchema) {
    console.log('sdf')
    await createChat({ name })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4" />
          Criar novo chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Chat</DialogTitle>
          <DialogDescription>
            Crie um novo chat para conversar com seus amigos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateChat)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do chat</Label>
              <Input
                id="name"
                placeholder="Insira o nome do chat"
                {...register('name')}
              />
              <p className="text-xs text-red-600 text-end capitalize flex-grow">
                {errors.name?.message}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Criar</Button>
            <DialogClose>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
