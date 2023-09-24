import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IHeroPhoto {
  photo_url: string;
  photo_title: string;
}

@Table({ tableName: 'heroPhotos' })
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
    allowNull: false,
  })
  photo_url: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
    defaultValue: 'Hero photo',
  })
  photo_title: string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  hero_id: number;
}