'use client'

import useStore from '@/lib/zustand'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function NameDialog() {
  const { user, setUser } = useStore()

  const handleSetUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const user = formData.get('user') as string
    setUser(user)
  }

  return (
    <Dialog defaultOpen open={!user}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Chat</DialogTitle>
          <DialogDescription>
            Crie um novo chat para conversar com seus amigos. {user}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSetUser}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user">Nome do chat</Label>
              <Input
                id="user"
                name="user"
                placeholder="Insira o nome do chat"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
