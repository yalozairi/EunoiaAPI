const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists",
     },
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
         isEmail: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  },
  {
    sequelize: db,
  },
);

module.exports = User;