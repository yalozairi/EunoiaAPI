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
        msg: "Email is already registered",
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
      allowNull: false,
      validate: {
        isIn: {
          args: [["customer", "vendor", "admin"]],
          msg: "Role does not exist",
        },
      },
    },
  },
  {
    sequelize: db,
  }
);

module.exports = User;
