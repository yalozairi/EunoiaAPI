//data
let notebooks = require("../notebooks");

const slugify = require("slugify");
let idCounter = notebooks.length + 1;

exports.notebookCreate = (req, res) => {
  const id = idCounter;
  idCounter++;
  const slug = slugify(req.body.name, { lower: true });

  const newNotebook = { id, slug, ...req.body };
  notebooks.push(newNotebook);

  res.status(201).json(newNotebook);
};

exports.notebookList = (req, res) => {
  res.json(notebooks);
};

exports.notebookUpdate = (req, res) => {
  const { notebookId } = req.params;
  const foundNotebook = notebooks.find(
    (notebook) => notebook.id === +notebookId
  );
  if (foundNotebook) {
    for (const key in req.body) foundNotebook[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Notebook not found" });
  }
};

exports.notebookDelete = (req, res) => {
  const { notebookId } = req.params;
  const foundNotebook = notebooks.find(
    (notebook) => notebook.id === +notebookId
  );
  if (foundNotebook) {
    notebooks = notebooks.filter(
      (notebook) => notebook.id !== +foundNotebook.id
    );
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Notebook not found" });
  }
};
