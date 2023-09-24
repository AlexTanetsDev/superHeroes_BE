import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';

import { SequelizeModule } from '@nestjs/sequelize';
import { HeroesModule } from './heroes/heroes.module';
import { Hero } from './heroes/heroes.model';
import { Photo } from './photos/photos.model';

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTRGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env;

@Module({
  imports: [
    HeroesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      username: POSTGRES_USER,
      password: POSTRGRES_PASSWORD,
      database: POSTGRES_DB,
      models: [Hero, Photo],
      autoLoadModels: true,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
