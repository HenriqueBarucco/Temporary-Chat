'use client'

import { Paperclip, SmileIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import sendMessage from '@/actions/send-message'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { DropzoneOptions } from 'react-dropzone'
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '../ui/file-uploader'
import uploadFile from '@/actions/upload-file'

const sendMessageSchema = z.object({
  message: z.string().min(1),
  files: z
    .array(
      z.instanceof(File).refine((file) => file.size < 50 * 1024 * 1024, {
        message: 'O tamanho do arquivo precisa ser menor que 50MB',
      }),
    )
    .max(1, {
      message: 'Apenas um arquivo pode ser enviado por vez',
    })
    .nullable(),
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
    setValue,
    watch,
  } = useForm<SendMessageSchema>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      message: '',
      files: null,
    },
  })

  const dropzone = {
    multiple: false,
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  } satisfies DropzoneOptions

  async function handleSendMessage({ message, files }: SendMessageSchema) {
    if (!user) {
      toast.error('Você não está com o seu nome definido.')
      return
    }

    if (isFilesNotEmpty(files)) {
      await sendMessageWithFile(files,message)
    } else {
      await sendMessage({ message, chatId, user })
    }
  }

  async function sendMessageWithFile(files: File[],message: string) {
    const data = new FormData()
    data.append('file', files[0])

    const file = await uploadFile(data)
    await sendMessage({
      message,
      chatId,
      user:user!,
      file: {
        url: file,
        name: files[0].name,
      },
    })
  }

  function isFilesNotEmpty(files: File[] | null): files is File[] {
    return files !== null && files.length > 0;
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        message: '',
        files: null,
      })
    }
  }, [isSubmitSuccessful, reset])

  const selectedFiles = watch('files')

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleSendMessage)}
    >
      <Button size="icon" variant="ghost">
        <SmileIcon className="size-6" />
      </Button>
      <Input
        className="flex-1"
        placeholder="Digite uma mensagem..."
        {...register('message')}
      />
      <div className="relative flex items-center gap-2">
        <FileUploader
          value={selectedFiles}
          onValueChange={(value) => setValue('files', value)}
          dropzoneOptions={dropzone}
          reSelect={true}
        >
          {selectedFiles && selectedFiles.length > 0 ? (
            <FileUploaderContent className="flex items-center gap-2 ml-2">
              {selectedFiles.map((file, i) => (
                <FileUploaderItem key={i} index={i} className="p-0 h-12 px-2">
                  <span className="text-sm font-normal truncate w-32">
                    {file.name}
                  </span>
                </FileUploaderItem>
              ))}
            </FileUploaderContent>
          ) : (
            <FileInput className="flex items-center justify-center w-fit h-12 px-2 border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200">
              <Paperclip className="size-6 mr-2" />
              <span className="text-sm">Selecionar arquivo</span>
            </FileInput>
          )}
        </FileUploader>
      </div>
      <Button type="submit">Enviar</Button>
    </form>
  )
}
