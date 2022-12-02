const APIError = require("./apiError");
const NotFoundError = require("./notFoundError");
const BadRequestError = require("./validation-error");
const NotAuthenticatedError = require("./not-authenticated-error");
const ForbiddenError = require("./forbidden-error");

module.exports = {
  APIError,
  NotFoundError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
};
