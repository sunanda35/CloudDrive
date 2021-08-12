const Files = require("../Models/file.model");
const createHttpError = require("http-errors");

module.exports = {
  addFile: async (req, res, next) => {
    try {
      res.send("add file");
    } catch (err) {
      next(err);
    }
  },
  getAllFile: async (req, res, next) => {
    try {
      res.send("get all files");
    } catch (err) {
      next(err);
    }
  },
  getOneFileDetails: async (req, res, next) => {
    try {
      const file = req.params.id;
      res.send(`get one file details with ${file}`);
    } catch (err) {
      next(err);
    }
  },
  deleteOneFile: async (req, res, next) => {
    try {
      const file = req.params.id;
      res.send(`delete one file with id: ${file}`);
    } catch (err) {
      next(err);
    }
  },
};
