import S3 from 'aws-sdk/clients/s3'

import { CONFIG } from '@/config'
import { convertFileToBuffer } from '@/helpers/convert-file-to-buffer'

export class StorageProvider {
  client: S3

  constructor() {
    this.client = new S3({
      endpoint: CONFIG.providers.storage.endpoint,
      apiVersion: 'latest',
      accessKeyId: CONFIG.providers.storage.accessKeyId,
      secretAccessKey: CONFIG.providers.storage.secretAccessKey,
      signatureVersion: CONFIG.providers.storage.signatureVersion,
      s3ForcePathStyle: true,
    })
  }

  async upload(file: File): Promise<string> {
    const fileBuffer = await convertFileToBuffer(file)

    const params = {
      Bucket: CONFIG.providers.storage.bucket as string,
      Key: file.name,
      Body: fileBuffer,
      ACL: 'public-read',
    }

    try {
      const { Location } = await this.client.upload(params).promise()
      return Location
    } catch (error) {
      console.error('Upload error:', error)
      throw new Error('Error uploading file')
    }
  }
}
