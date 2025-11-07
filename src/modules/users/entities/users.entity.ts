import { Column, Model, Table, DataType } from 'sequelize-typescript';

interface UserCreationAttributes {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

@Table({
  tableName: 'users',
  paranoid: true,
  timestamps: true,
})
export class UsersEntity extends Model<UsersEntity, UserCreationAttributes> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
