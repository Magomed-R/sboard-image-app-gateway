import { Module } from '@nestjs/common'
import { minioClientProvider } from './minio-client.provider'

@Module({
  providers: [minioClientProvider],
  exports: [minioClientProvider]
})
export class MinioModule {}
