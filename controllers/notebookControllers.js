//Data
const { Notebook } = require("../db/models");

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
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(_notebooks);
  } catch (error) {
    next(error);
  }
};

exports.notebookCreate = async (req, res, next) => {
  try {
    const newNotebook = await Notebook.create(req.body);
    res.status(201).json(newNotebook);
  } catch (error) {
    next(error);
  }
};

exports.notebookUpdate = async (req, res, next) => {
  try {
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
