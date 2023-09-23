import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICreateHero {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
}

@Table({ tableName: 'heroes' })
export class Hero extends Model<Hero, ICreateHero> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  hero_id: number;

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  nickname: string;

  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  real_name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  origin_description: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  superpowers: string;

  @Column({ type: DataType.TEXT })
  catch_phrase: string;
}
