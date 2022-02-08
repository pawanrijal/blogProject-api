const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./utils/jwt-token")(passport);
const token = require("./utils/token-generate");
const jwt = require("jsonwebtoken");
const { upload } = require("./multer/multer_config");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const User = require("./mongodb/UserModel");
const app = express();
const { sequelize } = require("./lib/database-connection");
const { initRoutes } = require("./routes");
const HttpException = require("../exceptions/http-exception");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize
  .authenticate()
  .then(() => {
    // sequelize.sync({ force: true });
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
initRoutes(app);

// app.get("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
// });

//DB Connection

const url =
  "mongodb+srv://pawanrijal10:pawan123@cluster0.ufl6h.mongodb.net/Pawan?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.post("/mongo/create", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const data = await user.save();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  const err = new HttpException(404, "Page not Found");
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.success = err.success || false;
  err.message = err.errors || err.error || "Something went wrong";
  err.status = err.status || "error";
  err.detail = err.details;
  res.json({
    error: err.message,
    statusCode: err.statusCode,
    success: err.success,
    source: err.detail,
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
