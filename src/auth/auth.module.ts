import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AUTH_PACKAGE, AUTH_PACKAGE_NAME } from 'src/constants'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { AUTH_SERVICE_URL } from 'src/config'
import { AuthExceptionFilter } from './auth-exception.filter'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'proto/auth.proto'),
          url: AUTH_SERVICE_URL
        }
      }
    ])
  ],
  providers: [AuthService, AuthExceptionFilter],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
