const APIError = require("./apiError");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends APIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
