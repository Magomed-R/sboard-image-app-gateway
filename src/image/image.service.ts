import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { extname } from 'path'
import { Request } from 'express'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class ImageService {
  constructor(@Inject() private authService: AuthService) {}

  async create(user: Request['user'], file: Express.Multer.File) {
    const uploadFilename = `${randomUUID()}${extname(file.originalname)}`

    return uploadFilename
  }
}
