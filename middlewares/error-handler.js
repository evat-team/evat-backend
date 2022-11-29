const Errors = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof Errors.APIError) {
    return res.status(err.statusCode).json({
      error: err.message,
      sucess: "false",
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: err.message,
    sucess: "false",
    err,
  });
};

module.exports = errorHandlerMiddleware;
