const APIError = require("./apiError");
const { StatusCodes } = require("http-status-codes");

class NotAthenticatedError extends APIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = NotAthenticatedError;
