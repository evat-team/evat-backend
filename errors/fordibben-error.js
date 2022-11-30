const { StatusCodes } = require("http-status-codes");
const APIError = require("./apiError");

class FordibbenError extends APIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = FordibbenError;
