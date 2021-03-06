const UserController = require("../controllers/userController");
const { userSchema } = require("../validationSchemas/userValidationSchema");
const validator = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const passport = require("passport");
const { upload } = require("../multerConfig/multerConfig");

module.exports = (app) => {
  app
    .route("/user/create")
    .post(
      upload.single("profile_pic"),
      validator(userSchema),
      UserController.create
    ),
    app
      .route("/user/update/:id")
      .put(validator(userSchema), UserController.update);
  app.route("/user").get(UserController.findAll);
  app.route("/user/:id").get(UserController.findById);
  app.route("/user/delete/:id").get(UserController.delete);
  app
    .route("/user/profile")
    .post(
      passport.authenticate("jwt", { session: false }),
      UserController.profile
    );
  app.route("/user/login").post(UserController.login);
};
