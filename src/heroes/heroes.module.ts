import { Module } from '@nestjs/common';
import { HeroesController } from './heroes.controller';
import { HeroesServise } from './heroes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hero } from './heroes.model';
import { Photo } from '../photos/photos.model';
import { PhotosService } from 'src/photos/photos.service';

@Module({
  controllers: [HeroesController],
  providers: [HeroesServise, PhotosService],
  imports: [SequelizeModule.forFeature([Hero, Photo])],
})
export class HeroesModule {}
