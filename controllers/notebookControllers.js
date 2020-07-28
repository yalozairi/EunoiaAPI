//Data
const { Notebook, Vendor } = require("../db/models");

exports.fetchNotebook = async (notebookId, next) => {
  try {
    notebook = await Notebook.findByPk(notebookId);
    return notebook;
  } catch (error) {
    next(error);
  }
};

exports.notebookList = async (req, res, next) => {
  try {
    const _notebooks = await Notebook.findAll({
      attributes: { exclude: ["vendorId", "createdAt", "updatedAt"] },
      include: {
        model: Vendor,
        as: "vendor",
        attributes: ["name"],
      },
    });
    res.json(_notebooks);
  } catch (error) {
    next(error);
  }
};

exports.notebookUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }

    await req.notebook.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.notebookDelete = async (req, res, next) => {
  try {
    await req.notebook.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
