import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CreateChat from '@/components/create-chat'
import NameDialog from '@/components/name-dialog'
import { Toaster } from 'sonner'
import Providers from '@/providers/providers'
import Chats from '@/components/chats'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Temporary Chat',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers>
          <NameDialog />
          <Toaster />
          <div className="flex h-screen bg-white dark:bg-zinc-800">
            <aside className="w-80 border-r dark:border-zinc-700">
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Temporary Chat</h2>
                </div>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                  <Input
                    className="pl-8"
                    placeholder="Buscar chats..."
                    type="search"
                  />
                  <Button
                    className="absolute right-2.5 top-3"
                    size="icon"
                    variant="ghost"
                  />
                </div>
                <div className="space-y-2">
                  <CreateChat />
                  <Chats />
                </div>
              </div>
            </aside>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
