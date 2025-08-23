import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  UnauthorizedException,
  UnprocessableEntityException
} from '@nestjs/common'

@Catch()
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    if (exception.details === 'INVALID_BEARER_TOKEN')
      throw new UnprocessableEntityException({
        message: 'Invalid Bearer token'
      })
    if (exception.details === 'USER_NOT_FOUND')
      throw new UnauthorizedException({
        message: 'User not found'
      })
    if (exception.details === 'PASSWORD_DOES_NOT_MATCH')
      throw new ForbiddenException({
        message: 'Password does not match'
      })

    throw new BadRequestException(exception)
  }
}
