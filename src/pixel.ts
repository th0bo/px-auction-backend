import { Model, STRING, Sequelize, BIGINT } from "sequelize";

export class Pixel extends Model { }
export const init = (sequelize: Sequelize) => {
  Pixel.init({
    x: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    y: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    bid: {
      type: BIGINT,
      allowNull: false,
    },
    buyer: {
      type: STRING,
      allowNull: true,
    },
    color: {
      type: STRING,
      allowNull: false,
    },
  }, {
    sequelize,
  });
}