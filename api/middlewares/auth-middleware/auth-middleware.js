const utils = require("node:util");
const jwt = require("jsonwebtoken");
const { NotAuthenticatedError } = require("../../errors");
const { EmployeeService } = require("../../services");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization.startsWith("Bearer ")) {
    throw new NotAuthenticatedError("Access not allowed");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new NotAuthenticatedError("Access not allowed");
  }

  const payload = await utils.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const { id } = payload;

  const user = await EmployeeService.returnSingleEmployee(id);

  if (!user) {
    throw new NotAuthenticatedError("User no longer exists");
  }

  req.user = { ...user.toObject() };
  next();
};

module.exports = authMiddleware;
