//Create Express App instance
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//DB
const db = require("./db");

//Routes
const notebookRoutes = require("./routes/notebooks");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  next();
});

//Routers
app.use("/notebooks", notebookRoutes);

app.use((req, res, next) => {
  res.status(404).json("Path not Found");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sync({ alter: true });
  } catch (error) {
    console.error("run -> error", error);
  }
  app.listen(8000, () =>
    console.log("The application is running on localhost:8000")
  );
};

run();
