import { MINIO_HOST, MINIO_PORT, MINIO_USER, MINIO_PASS, MINIO_USE_SSL } from '../config'
import { MINIO_CLIENT } from '../constants'
import * as Minio from 'minio'

export const minioClientProvider = {
  provide: MINIO_CLIENT,
  useFactory: () => {
    const client = new Minio.Client({
      endPoint: MINIO_HOST!,
      port: parseInt(MINIO_PORT!),
      useSSL: MINIO_USE_SSL === 'true' || MINIO_USE_SSL === 'on',
      accessKey: MINIO_USER,
      secretKey: MINIO_PASS
    })

    return client
  }
}
