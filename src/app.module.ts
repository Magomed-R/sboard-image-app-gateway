import { Module } from '@nestjs/common'
import { ImageModule } from './image/image.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [ImageModule, AuthModule]
})
export class AppModule {}
