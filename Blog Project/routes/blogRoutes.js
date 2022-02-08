const BlogController = require("../controllers/blogController");
const { blogSchema } = require("../validationSchemas/blogValidationSchema");
const validator = require("../middleware/validationMiddleware");
const { upload } = require("../multerConfig/multerConfig");

module.exports = (app) => {
  app
    .route("/blog/create")
    .post(validator(blogSchema), upload.single("image"), BlogController.create);
  app
    .route("/blog/update/:id")
    .put(validator(blogSchema), BlogController.update);
  app.route("/blog").get(BlogController.findAll);
  app.route("/blog/:id").get(BlogController.findById);
  app.route("/blog/delete/:id").get(BlogController.delete);
};
