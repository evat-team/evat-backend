const utils = require("node:util");
const jwt = require("jsonwebtoken");
const { FordibbenError } = require("../errors");
const Models = require("./../models");

const authMiddleware = async (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new FordibbenError("Access not allowed");
  }

  const payload = await utils.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user =
    (await Models.NurseModel.findById(payload._id)) ||
    (await Models.DoctorModel.findOne(payload._id)) ||
    (await Models.ResidentModel.findOne(payload._id)) ||
    (await Models.QaModel.findOne(payload._id));

  if (!user) {
    throw new FordibbenError("User no longer exists");
  }

  req.user = { ...user };
  next();
};

module.exports = authMiddleware;
