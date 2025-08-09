import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common'
import { LoginDto, SignupDto, VerifyDto } from './interfaces/GrpcAuthService'
import { AuthService } from './auth.service'
import { AuthExceptionFilter } from './auth-exception.filter'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseFilters(AuthExceptionFilter)
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto)
  }

  @Post('login')
  @UseFilters(AuthExceptionFilter)
  login(@Body() signupDto: LoginDto) {
    return this.authService.login(signupDto)
  }

  @Get('verify')
  @UseFilters(AuthExceptionFilter)
  verify(@Query('accessToken') accessToken: VerifyDto['accessToken']) {
    return this.authService.verify(accessToken)
  }
}
