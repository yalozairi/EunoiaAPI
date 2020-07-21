//Create Express App instance
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Routes
const notebookRoutes = require("./routes/notebooks");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routers
app.use("/notebooks", notebookRoutes);

app.listen(8000, () =>
  console.log("The application is running on localhost:8000")
);
