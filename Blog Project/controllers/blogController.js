const BlogService = require("../service/blogService");
const successResponse = require("../utils/successResponse");
const jwt = require("jsonwebtoken");
const { user } = require("../lib/databaseConnection");

class BlogController {
  async create(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
      const id = req.body.id;
      const _user = await user.findOne({
        where: {
          id: decoded.sub,
        },
      });
      console.log(_user);
      req.body.userId = _user.dataValues.id;
      req.body.author_name = _user.dataValues.username;
      const imgPath = req.file.path;
      req.body.image = imgPath;
      let blogData = await BlogService.findById(id);
      if (blogData == null) {
        blogData = await BlogService.create(req.body);
        successResponse(res, 200, blogData, "Blog Created");
      } else {
        res.json({
          message: "Blog already exists",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const blogData = await BlogService.update(req.body, id);
      successResponse(res, 200, blogData, "Blog updated");
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const blogData = await BlogService.findAll();
      successResponse(res, 200, blogData, "Blog fetched");
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    const id = req.params.id;
    try {
      const blogData = await BlogService.findById(id);
      if (blogData == null) {
        res.status(404).json({ status: "404", message: "Blog Not Found" });
      } else {
        successResponse(res, 200, blogData, "Blog fetched");
      }
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;
    try {
      let blogData = await BlogService.findById(id);
      if (blogData == null) {
        res.status(404).json({ status: "404", message: "Blog Not Found" });
      } else {
        const blogData = await BlogService.delete(id);
        successResponse(res, 200, blogData, "Blog Deleted");
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BlogController();
