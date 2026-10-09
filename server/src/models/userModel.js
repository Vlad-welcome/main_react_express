import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class User extends Model {
  toSafeJSON() {
    const { password, ...userWithoutPassword } = this.toJSON();
    return userWithoutPassword;
  }
}

User.init(
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  },
);

export default User;
