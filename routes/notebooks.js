const express = require("express");

//Controllers
const {
  notebookCreate,
  notebookList,
  notebookUpdate,
  notebookDelete,
} = require("../controllers/notebookControllers");

const router = express.Router();

//List
router.get("", notebookList);

//Notebook Create
router.post("/", notebookCreate);

//Notebook Delete
router.delete("/:notebookId", notebookDelete);

//Notebook Update
router.put("/:notebookId", notebookUpdate);

module.exports = router;
