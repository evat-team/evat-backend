const utils = require("node:util");
const jwt = require("jsonwebtoken");
const { NotAuthenticatedError } = require("../errors");
const Models = require("./../models");

const authMiddleware = async (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new NotAuthenticatedError("Access not allowed");
  }

  const payload = await utils.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await Promise.any([
    await Models.NurseModel.findById(payload._id),
    await Models.DoctorModel.findById(payload._id),
    await Models.ResidentModel.findById(payload._id),
    await Models.QaModel.findById(payload._id),
  ]);

  if (!user) {
    throw new NotAuthenticatedError("User no longer exists");
  }

  req.user = { ...user };
  next();
};

module.exports = authMiddleware;
