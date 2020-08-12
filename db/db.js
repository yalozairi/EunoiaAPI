const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "PUT PASSWORD HERE",
  database: "eunoiadb",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
