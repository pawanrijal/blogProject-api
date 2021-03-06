const UserService = require("../service/userService");
const successResponse = require("../utils/successResponse");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  async create(req, res, next) {
    try {
      const id = req.body.id;
      let userData = await UserService.findById(id);
      if (userData == null) {
        const imgPath = req.file.path;
        req.body.profile_pic = imgPath;
        const data = await UserService.create(req.body);
        successResponse(res, 400, data, "User Created");
      } else {
        res.json({
          message: "User already exists",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const userData = await UserService.update(req.body, id);
      successResponse(res, 200, userData, "User updated");
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const userData = await UserService.findAll();
      successResponse(res, 200, userData, "User fetched");
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    const id = req.params.id;
    try {
      const userData = await UserService.findById(id);
      if (userData == null) {
        res.status(404).json({ status: "404", message: "User Not Found" });
      } else {
        successResponse(res, 200, userData, "User fetched");
      }
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;
    try {
      let userData = await UserService.findById(id);
      if (userData == null) {
        res.status(404).json({ status: "404", message: "User Not Found" });
      } else {
        const userData = await UserService.delete(id);
        successResponse(res, 200, userData, "User Deleted");
      }
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const data = await UserService.login(req.body);
      if (data == null) {
        res.status(404).json({
          message: "Your account doesnot exist",
        });
      } else {
        res.json(data);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async profile(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
      // console.log(decoded);
      const userData = await UserService.profile(decoded);
      successResponse(res, 200, userData, "User Profile");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
