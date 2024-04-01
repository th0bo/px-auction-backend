import { Model, STRING, Sequelize, BIGINT } from "sequelize";

export class User extends Model { }
export const init = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
    wealth: {
      type: BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
  });
}