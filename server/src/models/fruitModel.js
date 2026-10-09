import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./userModel.js";

class Fruit extends Model {}

Fruit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Fruit",
    tableName: "fruits",
  },
);

User.hasMany(Fruit, {
  foreignKey: "userId",
  as: "fruits",
  onDelete: "CASCADE",
});

Fruit.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Fruit;
