const BlogRoute = require("./blogRoutes");
const UserRoute = require("./userRoutes");
exports.initRoutes = (app) => {
    BlogRoute(app);
  UserRoute(app);
};
