import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { firstValueFrom, Observable } from 'rxjs'
import { AuthService } from '../../auth/auth.service'

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest()
    const bearerToken = request.headers.authorization?.split(' ')?.[1]

    if (!bearerToken)
      throw new UnauthorizedException({
        message: 'BearerToken is not defined in authorization field (Headers)',
        error: 'Unauthorized',
        statusCode: 401
      })

    const { user } = await firstValueFrom(this.authService.verify(bearerToken))

    request.user = user

    return next.handle()
  }
}
