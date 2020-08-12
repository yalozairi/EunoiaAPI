const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Email not Recognized",
        },
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "customer",
    },
  },
  {
    sequelize: db,
  }
);

module.exports = User;
