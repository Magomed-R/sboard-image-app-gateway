import { Inject, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { extname } from 'path'
import { Request } from 'express'
import { InjectQueue } from '@nestjs/bullmq'
import { COMPRESS_JOB, IMAGE_QUEUE, IMAGES_BUCKET, MINIO_CLIENT } from '../constants'
import { Queue } from 'bullmq'
import { Client } from 'minio'

@Injectable()
export class ImageService {
  constructor(
    @Inject(MINIO_CLIENT) private minioClient: Client,
    @InjectQueue(IMAGE_QUEUE) private imageCompressQueue: Queue
  ) {}

  async create(user: Request['user'], file: Express.Multer.File) {
    const uploadFilename = `${randomUUID()}${extname(file.originalname)}`

    await this.minioClient.putObject(IMAGES_BUCKET, uploadFilename, file.buffer)

    await this.imageCompressQueue.add(COMPRESS_JOB, {
      userId: user.id,
      imagePath: uploadFilename
    })

    return uploadFilename
  }
}
