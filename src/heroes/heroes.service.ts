import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Hero } from './heroes.model';

@Injectable()
export class HeroesServise {
  constructor(@InjectModel(Hero) private heroesRepository: typeof Hero) {}

  async getAll() {
    const heroes = await this.heroesRepository.findAll();
    return heroes;
  }

  async getById(hero_id: string) {
    const hero = await this.heroesRepository.findByPk(hero_id);
    return hero;
  }

  async createHero(dto: CreateHeroDto) {
    const hero = await this.heroesRepository.create(dto);
    return hero;
  }

  async removeHero(id: string) {
    const hero = await this.heroesRepository.destroy({
      where: {
        hero_id: id,
      },
    });
    if (hero) return 'Hero deleted succesfully';

    return 'Something went wrong, try again';
  }

  async updateHero(dto: UpdateHeroDto, id: string) {
    const hero = await this.heroesRepository.update(dto, {
      where: {
        hero_id: id,
      },
    });

    if (hero[0]) return 'Hero updated succesfully';
    return 'something went wrong, please check you entry';
  }
}
