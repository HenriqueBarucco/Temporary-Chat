'use server'

import { StorageProvider } from '@/lib/storage'

export default async function uploadFile(data: FormData): Promise<string> {
  const file = data.get('file') as File
  const storage = new StorageProvider()
  const url = await storage.upload(file)

  return url
}
