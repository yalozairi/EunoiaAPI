const express = require("express");
const upload = require("../middleware/multer");

//Controllers
const {
  notebookCreate,
  notebookList,
  notebookUpdate,
  notebookDelete,
  fetchNotebook,
} = require("../controllers/notebookControllers");

const router = express.Router();

router.param("notebookId", async (req, res, next, notebookId) => {
  const notebook = await fetchNotebook(notebookId, next);
  if (notebook) {
    req.notebook = notebook;
    next();
  } else {
    const err = new Error("Notebook Not Found");
    err.status = 404;
    next(err);
  }
});

//List
router.get("/", notebookList);

router.use((req, res, next) => {
  next();
});

//Notebook Delete
router.delete("/:notebookId", notebookDelete);

//Notebook Update
router.put("/:notebookId", upload.single("image"), notebookUpdate);

module.exports = router;
