import { Inject, Injectable } from '@nestjs/common'
import { GrpcAuthService, LoginDto, SignupDto } from './interfaces/GrpcAuthService'
import { AUTH_PACKAGE, AUTH_SERVICE_NAME } from 'src/constants'
import { ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class AuthService {
  private grpcAuthService: GrpcAuthService

  constructor(@Inject(AUTH_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.grpcAuthService = this.client.getService<GrpcAuthService>(AUTH_SERVICE_NAME)
  }

  signup(signupDto: SignupDto) {
    return this.grpcAuthService.signup(signupDto)
  }

  login(loginDto: LoginDto) {
    return this.grpcAuthService.login(loginDto)
  }

  verify(accessToken: string) {
    return this.grpcAuthService.verify({ accessToken })
  }
}
