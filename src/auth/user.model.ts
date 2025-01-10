
import sequelize from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";


@Table({ tableName: 'User' })
export class User extends Model {
  @Column({
    allowNull: false,
    unique: true
  })
  email: string

  @Column({allowNull: false})
  password: string

  @Column({
    type: sequelize.ENUM,
    values: ["user", "admin"],
    defaultValue: "user"
  })
  role: string
}