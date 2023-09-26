import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroesServise } from './heroes.service';
import { Hero } from './heroes.model';
import { PhotosService } from 'src/photos/photos.service';
import { PhotoS3Loader } from 'src/helpers/aws.s3';

@ApiTags('Heroes')
@Controller('heroes')
export class HeroesController {
  constructor(
    private readonly heroesServise: HeroesServise,
    private readonly photosServise: PhotosService,
    private readonly photoLoader: PhotoS3Loader,
  ) {}

  @ApiOperation({ summary: 'Get all superheroes' })
  @ApiResponse({ status: 200, type: [Hero] })
  @Get()
  getAll() {
    return this.heroesServise.getAll();
  }

  @ApiOperation({ summary: 'Get one superhero by id' })
  @ApiResponse({ status: 200, type: Hero })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.heroesServise.getById(id);
  }

  @ApiOperation({ summary: 'Create superhero' })
  @ApiResponse({ status: 201, type: Hero })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  async createHero(
    @UploadedFile() file: Express.Multer.File,
    @Body() createHeroDto: CreateHeroDto,
  ) {
    const hero = await this.heroesServise.createHero(createHeroDto);

    await this.photoLoader.uploadPhoto(file.originalname, file);
    await this.photosServise.addPhoto({
      photo_title: file.originalname,
      owner_id: hero.dataValues.hero_id,
    });

    return 'Hero created sucsessfuly';
  }

  @ApiOperation({ summary: 'Delete superhero' })
  @ApiResponse({ status: 200, type: String })
  @Delete(':id')
  async removeHero(@Param('id') id: string) {
    return await this.heroesServise.removeHero(id);
  }

  @ApiOperation({ summary: 'Update superhero' })
  @ApiResponse({ status: 200, type: String })
  @Put(':id')
  async update(@Body() updateHeroDto: UpdateHeroDto, @Param('id') id: string) {
    return await this.heroesServise.updateHero(updateHeroDto, id);
  }
}
