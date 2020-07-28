const Notebook = require("./Notebook");
const Vendor = require("./Vendor");

Vendor.hasMany(Notebook, {
  as: "notebooks",
  foreignKey: "vendorId",
  allowNull: false,
});

Notebook.belongsTo(Vendor, { as: "vendor" });

module.exports = { Notebook, Vendor };
