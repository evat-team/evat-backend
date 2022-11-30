const APIError = require("./apiError");
const NotFoundError = require("./notFoundError");
const BadRequestError = require("./validation-error");
const NotAthenticatedError = require("./not-authenticated-error");
const FordibbenError = require("./fordibben-error");

module.exports = {
  APIError,
  NotFoundError,
  BadRequestError,
  NotAthenticatedError,
  FordibbenError,
};
