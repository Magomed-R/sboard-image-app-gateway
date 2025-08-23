import { BadRequestException, PipeTransform, UnprocessableEntityException } from '@nestjs/common'
import { extname } from 'path'

export class FileDefinitionPipe implements PipeTransform {
  transform(file?: Express.Multer.File | null) {
    if (!file) {
      throw new BadRequestException({
        message: 'File is not defined in "image" field'
      })
    }

    const acceptableExtensions = ['webp', 'jpg', 'jpeg', 'png']
    const fileExtension = extname(file.originalname).slice(1)

    if (!fileExtension || !acceptableExtensions.includes(fileExtension)) {
      throw new UnprocessableEntityException({
        message: "The file has an invalid extension. Valid extensions are 'webp', 'jpg', 'jpeg', 'png'"
      })
    }

    return file
  }
}
