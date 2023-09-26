import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './photos.model';
import { PhotoS3Loader } from 'src/helpers/aws.s3';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, PhotoS3Loader],
  imports: [SequelizeModule.forFeature([Photo])],
})
export class PhotosModule {}
