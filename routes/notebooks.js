const express = require("express");
const upload = require("../middleware/multer");
const passport = require("passport");

//Controllers
const {
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
router.delete(
  "/:notebookId",
  passport.authenticate("jwt", { session: false }),
  notebookDelete
);

//Notebook Update
router.put(
  "/:notebookId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  notebookUpdate
);

module.exports = router;
