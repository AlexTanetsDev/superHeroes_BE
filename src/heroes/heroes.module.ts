import { Module } from '@nestjs/common';
import { HeroesController } from './heroes.controller';
import { HeroesServise } from './heroes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hero } from './heroes.model';

@Module({
  controllers: [HeroesController],
  providers: [HeroesServise],
  imports: [SequelizeModule.forFeature([Hero])],
})
export class HeroesModule {}
