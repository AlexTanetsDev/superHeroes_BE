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
} from '@nestjs/common';

import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroesServise } from './heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesServise: HeroesServise) {}

  @Get()
  getAll() {
    return this.heroesServise.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.heroesServise.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createHero(@Body() createHeroDto: CreateHeroDto) {
    return this.heroesServise.createHero(createHeroDto);
  }

  @Delete(':id')
  removeHero(@Param('id') id: string) {
    return this.heroesServise.removeHero(id);
  }

  @Put(':id')
  update(@Body() updateHeroDto: UpdateHeroDto, @Param('id') id: string) {
    return this.heroesServise.updateHero(updateHeroDto, id);
  }
}
