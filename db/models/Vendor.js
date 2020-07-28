const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const sequelizeSlugify = require("sequelize-slugify/lib/sequelize-slugify");

class Vendor extends Model {}

Vendor.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize: db,
  }
);

sequelizeSlugify.slugifyModel(Vendor, {
  source: ["name"],
});

module.exports = Vendor;
