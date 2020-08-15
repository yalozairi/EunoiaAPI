const { Sequelize } = require("sequelize");
const { sequelize } = require("./models/User");

const db = process.env.DATABASE_URL
  ? new sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
    })
  : new Sequelize({
      username: "postgres",
      password: "3982",
      database: "eunoiadb",
      dialect: "postgres",
      host: "localhost",
      logging: false,
    });

module.exports = db;
