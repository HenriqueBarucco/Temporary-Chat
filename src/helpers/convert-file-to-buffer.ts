/* eslint-disable @typescript-eslint/no-explicit-any */
export async function convertFileToBuffer(file: File) {
  const stream = file.stream()

  const chunks = []

  for await (const chunk of stream as any) {
    chunks.push(chunk)
  }

  const buffer = Buffer.concat(chunks)

  return buffer
}
