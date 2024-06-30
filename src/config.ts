export const CONFIG = {
  providers: {
    storage: {
      provider: 'MINIO',
      endpoint: process.env.STORAGE_ENDPOINT,
      bucket: process.env.STORAGE_BUCKET,
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
    },
  },
}
