const cors = require("cors");

//Create Express App instance
const express = require("express");

//data
let notebooks = require("./notebooks");
const app = express();

app.use(cors());

app.get("/", (request, response) => {
  console.log("hihihello");
  response.json({ message: "helloworld" });
});

app.get("/notebooks", (req, res) => {
  res.json(notebooks);
});

app.delete("/notebooks/:notebookId", (req, res) => {
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
});

app.listen(8000, () =>
  console.log("The application is running on localhost:8000")
);
