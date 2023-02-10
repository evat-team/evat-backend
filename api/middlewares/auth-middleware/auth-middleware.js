const utils = require("node:util");
const jwt = require("jsonwebtoken");
const { NotAuthenticatedError } = require("../../errors");
const { EmployeeService } = require("../../services");

const authMiddleware = async (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new NotAuthenticatedError("Access not allowed");
  }

  const payload = await utils.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const { _id: id } = payload;

  const user = await EmployeeService.returnSingleEmployee(id);

  if (!user) {
    throw new NotAuthenticatedError("User no longer exists");
  }

  req.user = { ...user };
  next();
};

module.exports = authMiddleware;
