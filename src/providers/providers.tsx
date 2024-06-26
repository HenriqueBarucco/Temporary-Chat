import { PropsWithChildren } from 'react'
import { QueryProvider } from './query-provider'

export default function Providers({ children }: PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>
}
