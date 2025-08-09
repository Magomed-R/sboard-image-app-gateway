import { BadRequestException, PipeTransform } from '@nestjs/common'

export class FileDefinitionPipe implements PipeTransform {
  transform(file?: Express.Multer.File | null) {
    if (!file) {
      throw new BadRequestException({
        message: 'File is not defined in "image" field',
        error: 'Bad Request',
        statusCode: 400
      })
    }

    return file
  }
}
