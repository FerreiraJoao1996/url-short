import { Column, Model, Table, DataType } from 'sequelize-typescript';

interface UrlAttributes {
  user_id?: number;
  original_url: string;
  short_url: string;
  number_clicks?: string;
}

@Table({
  tableName: 'url',
  paranoid: true,
  timestamps: true,
})
export class UrlEntity extends Model<UrlEntity, UrlAttributes> {

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  user_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  original_url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  short_url: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  number_clicks: number;
}
