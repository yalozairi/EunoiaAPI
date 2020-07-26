const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "3982",
  database: "eunoiadb",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
