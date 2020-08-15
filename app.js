//Create Express App instance
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");

// Passport Strategies
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");

//DB
const db = require("./db");

//Routes
const notebookRoutes = require("./routes/notebooks");
const vendorRoutes = require("./routes/vendors");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routers
app.use("/notebooks", notebookRoutes);
app.use("/vendors", vendorRoutes);
app.use(userRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

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
    await db.sync({
      alter: true,
      /* alter: true force: true */
    });
  } catch (error) {
    console.error("run -> error", error);
  }

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () =>
    console.log(`The application is running on localhost:${PORT}`)
  );
};

run();
