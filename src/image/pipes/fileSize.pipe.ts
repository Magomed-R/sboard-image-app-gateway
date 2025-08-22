import { ForbiddenException, PipeTransform } from '@nestjs/common'
import { maxFileSize } from '../../config'

export class FileSizePipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (file.size > maxFileSize) {
      throw new ForbiddenException({
        message: `File size cannot exceed ${maxFileSize / 1000 / 1000} MB`,
        error: 'Forbidden',
        statusCode: 403
      })
    }

    return file
  }
}
