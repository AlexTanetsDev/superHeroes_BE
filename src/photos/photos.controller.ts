import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Photo } from './photos.model';
import { PhotoS3Loader } from 'src/helpers/aws.s3';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('hero-photos')
@Controller('hero-photos')
export class PhotosController {
  constructor(
    private phoposServise: PhotosService,
    private photoLoader: PhotoS3Loader,
  ) {}

  @ApiOperation({ summary: 'Get all hero protos' })
  @ApiResponse({ status: 200, type: Photo })
  @Get(':id')
  async getHeroPhotos(@Param('id') id: string) {
    const photos = await this.phoposServise.getHeroPhotos(id);

    const photoUrlArr = Promise.all(
      photos.map(async (photo) => {
        const url = await this.photoLoader.getPhotoUrl(
          photo.dataValues.photo_title,
        );
        return { url, title: photo.dataValues.photo_title };
      }),
    );

    return photoUrlArr;
  }

  @ApiOperation({ summary: 'Add hero photo' })
  @ApiResponse({ status: 201, type: Photo })
  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  async addPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    await this.photoLoader.uploadPhoto(file.originalname, file);
    const result = await this.phoposServise.addPhoto({
      photo_title: file.originalname,
      owner_id: Number(id),
    });

    if (!result) throw new Error('Problem with adding photo, try again');
    return 'Photo add sucsessfuly';
  }

  @ApiOperation({ summary: 'delete photo' })
  @ApiResponse({ status: 200, type: Photo })
  @Delete(':id/:title')
  async deletePhoto(@Param('id') id: string, @Param('title') title: string) {
    const s3result = await this.photoLoader.deleteFromS3(title);
    if (s3result.$metadata.httpStatusCode !== 204)
      throw new Error('S3Deleting problem');

    return await this.phoposServise.deletePhoto(id);
  }
}
