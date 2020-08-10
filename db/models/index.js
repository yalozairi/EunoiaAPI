const Notebook = require("./Notebook");
const Vendor = require("./Vendor");
const User = require("./User")

Vendor.hasMany(Notebook, {
  as: "notebooks",
  foreignKey: "vendorId",
  allowNull: false,
});

Notebook.belongsTo(Vendor, { as: "vendor" });

module.exports = { Notebook, Vendor, User };
