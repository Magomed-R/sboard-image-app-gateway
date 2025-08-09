import { IsEmail, IsString } from 'class-validator'
import { Observable } from 'rxjs'

export interface GrpcAuthService {
  login(loginDto: LoginDto): Observable<UserAndToken>
  signup(signupDto: SignupDto): Observable<UserAndToken>
  verify(verifyDto: VerifyDto): Observable<VerifyResponse>
}

export class LoginDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export class SignupDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export class VerifyDto {
  @IsString()
  accessToken: string
}

export interface UserAndToken {
  user: User
  accessToken: string
}

export interface VerifyResponse {
  user: User
}

interface User {
  id?: string
  email: string
}
