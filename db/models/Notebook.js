const { DataTypes, Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const db = require("../db");
const sequelizeSlugify = require("sequelize-slugify/lib/sequelize-slugify");

class Notebook extends Model {}

Notebook.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: { args: 1, msg: "No Notebooks to be sold under 1 KWD" },
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize: db,
  }
);

sequelizeSlugify.slugifyModel(Notebook, {
  source: ["name"],
});

module.exports = Notebook;
