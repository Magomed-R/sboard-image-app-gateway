import { Module } from '@nestjs/common'
import { ImageController } from './image.controller'
import { ImageService } from './image.service'
import { AuthModule } from '../auth/auth.module'
import { BullModule } from '@nestjs/bullmq'
import { IMAGE_QUEUE } from '../constants'
import { MinioModule } from 'src/minio/minio.module'

@Module({
  imports: [
    AuthModule,
    BullModule.registerQueue({
      name: IMAGE_QUEUE
    }),
    MinioModule
  ],
  controllers: [ImageController],
  providers: [ImageService]
})
export class ImageModule {}
