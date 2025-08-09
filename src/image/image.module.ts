import { Module } from '@nestjs/common'
import { ImageController } from './image.controller'
import { ImageService } from './image.service'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [ImageController],
  providers: [ImageService]
})
export class ImageModule {}
