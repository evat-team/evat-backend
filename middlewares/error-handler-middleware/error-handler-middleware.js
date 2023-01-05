const { BadRequestError, ForbiddenError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let error = {
    message: err.message || "Something went wrong, try again later.",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  switch (true) {
    case err.code && err.code === 11000:
      error = new BadRequestError(
        `${Object.values(err.keyValue)} must be unique`
      );
      break;

    case err.name && err.name === "ValidationError":
      error = new BadRequestError(
        `${Object.values(err.errors)
          .map((err) => err.message)
          .join(", ")}`
      );
      break;

    case err.name && err.name === "CastError":
      error = new BadRequestError(
        "Data sent in the request is not valid. Please send correct data"
      );
      break;

    case err.name && err.name === "JsonWebTokenError":
      error = new ForbiddenError("Token is invalid, please login");
      break;
  }

  return res.status(error.statusCode).json({
    msg: error.message,
    sucess: "false",
    err,
  });
};

module.exports = errorHandlerMiddleware;
