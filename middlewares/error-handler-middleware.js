const { BadRequestError, ForbiddenError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let error = {
    message: err.message || "Something went wrong, try again later.",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.code && err.code === 11000) {
    error = new BadRequestError(
      `Value ${Object.values(err.keyValue)} must be unique`
    );
  }

  if (err.name && err.name === "ValidationError") {
    error = new BadRequestError(
      `${Object.values(err.errors)
        .map((err) => err.message)
        .join(", ")}`
    );
  }

  if (err.name && err.name === "CastError") {
    error = new BadRequestError("Value not accepted");
  }

  if (err.name && err.name === "JsonWebTokenError") {
    error = new ForbiddenError("Token is invalid, please login");
  }

  return res.status(error.statusCode).json({
    msg: error.message,
    sucess: "false",
    err,
  });
};

module.exports = errorHandlerMiddleware;
