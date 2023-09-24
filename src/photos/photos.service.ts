import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './photos.model';
import { AddPhotoDto } from './dto/addPhoto.dto';

export class PhotosService {
  constructor(@InjectModel(Photo) private photosRepository: typeof Photo) {}

  async getHeroPhotos(id: number) {
    const photos = await this.photosRepository.findAll({
      where: { hero_id: id },
    });
    return photos;
  }

  async addPhoto(dto: AddPhotoDto) {
    const photo = await this.photosRepository.create(dto);
    return photo;
  }

  async deletePhoto(id: string) {
    const result = await this.photosRepository.destroy({
      where: { photo_id: id },
    });
    return result;
  }
}
