import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Photo } from 'src/photos/photos.model';

interface ICreateHero {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  image: Express.Multer.File;
}

@Table({ tableName: 'heroes' })
export class Hero extends Model<Hero, ICreateHero> {
  @ApiProperty({ example: 1, description: 'Unique superhero ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  hero_id: number;

  @ApiProperty({ example: 'Superman', description: 'Superhero nickname' })
  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  nickname: string;

  @ApiProperty({ example: 'Clark Kent', description: 'Superhero real name' })
  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  real_name: string;

  @ApiProperty({
    example:
      "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction...",
    description: 'Superhero description',
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  origin_description: string;

  @ApiProperty({
    example:
      'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...',
    description: 'Superpower',
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  superpowers: string;

  @ApiProperty({
    example: "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
    description: 'Cath phrase',
  })
  @Column({ type: DataType.TEXT })
  catch_phrase: string;

  @HasOne(() => Photo, { foreignKey: 'owner_id', onDelete: 'CASCADE' })
  photo: Photo;
}
