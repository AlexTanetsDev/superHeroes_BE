import { Controller } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('hero-photos')
export class PhotosController {
  constructor(private phoposServise: PhotosService) {}
}
