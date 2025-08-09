import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ImageService } from './image.service'
import { FileSizePipe } from './pipes/fileSize.pipe'
import { FileDefinitionPipe } from './pipes/fileDefinition.pipe'
import { Request } from 'express'
import { AuthUserInterceptor } from './interceptors/authUser.interceptor'

@Controller({
  path: 'image',
  version: '1'
})
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseInterceptors(FileInterceptor('image'), AuthUserInterceptor)
  @Post()
  async upload(
    @Req() request: Request,
    @UploadedFile(new FileDefinitionPipe(), new FileSizePipe()) file: Express.Multer.File
  ) {
    return this.imageService.create(request.user, file)
  }
}
