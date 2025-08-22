import { Module } from '@nestjs/common'
import { ImageModule } from './image/image.module'
import { AuthModule } from './auth/auth.module'
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [ImageModule, AuthModule, MinioModule]
})
export class AppModule {}
