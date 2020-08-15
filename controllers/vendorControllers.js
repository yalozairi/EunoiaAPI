//Data
const { Vendor, Notebook } = require("../db/models");

exports.fetchVendor = async (vendorId, next) => {
  try {
    vendor = await Vendor.findByPk(vendorId);
    return vendor;
  } catch (error) {
    next(error);
  }
};

exports.notebookCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.vendor.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      req.body.vendorId = req.vendor.id;
      const newNotebook = await Notebook.create(req.body);
      res.status(201).json(newNotebook);
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.vendorList = async (req, res, next) => {
  try {
    const vendors = await Vendor.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Notebook,
          as: "notebooks",
          attributes: ["id"],
        },
      ],
    });
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

exports.vendorCreate = async (req, res, next) => {
  try {
    const foundVendor = await Vendor.findOne({
      where: { userId: req.user.id },
    });
    if (foundVendor) {
      const err = new Error("Your user already has a vendor");
      err.status = 403;
      return next(err);
    }
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.userId = req.user.id;
    const newVendor = await Vendor.create(req.body);
    res.status(201).json(newVendor);
  } catch (error) {
    next(error);
  }
};

exports.vendorUpdate = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.vendor.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      await req.vendor.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
exports.vendorDelete = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.vendor.userId) {
      await req.vendor.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
