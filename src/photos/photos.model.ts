import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Hero } from 'src/heroes/heroes.model';

interface IHeroPhoto {
  photo_title: string;
}

@Table({ tableName: 'herophotos' })
export class Photo extends Model<Photo, IHeroPhoto> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  photo_id: number;

  @Column({
    type: DataType.TEXT,
    unique: true,
    defaultValue: 'Hero photo',
    primaryKey: true,
  })
  photo_title: string;

  @ForeignKey(() => Hero)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  owner_id: number;

  @BelongsTo(() => Hero, { onDelete: 'CASCADE' })
  hero: Hero;
}
