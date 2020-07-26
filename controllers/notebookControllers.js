const { Notebook } = require("../db/models");

exports.notebookList = async (req, res, next) => {
  try {
    const _notebooks = await Notebook.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(_notebooks);
  } catch (error) {
    next(error);
  }
};

exports.notebookCreate = async (req, res, next) => {
  try {
    const newNotebook = await Notebook.crate(req.body);
    res.status(201).json(newNotebook);
  } catch (error) {
    next(error);
  }
};

exports.notebookUpdate = async (req, res, next) => {
  try {
    const { notebookId } = req.params;
    const foundNotebook = await Notebook.findByPk(notebookId);
    if (foundNotebook) {
      await foundNotebook.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Notebook Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.notebookDelete = async (req, res, next) => {
  try {
    const { notebookId } = req.params;
    const foundNotebook = await Notebook.findByPk(notebookId);
    if (foundNotebook) {
      await foundNotebook.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Notebook Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
