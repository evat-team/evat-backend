const authMiddleware = require("./auth-middleware/auth-middleware");
const errorHandlerMiddleware = require("./error-handler-middleware/error-handler-middleware");
const notFoundMiddleware = require("./not-found-middleware/not-found-middleware");
const routeAccessAllowedFor = require("./protected-routes-middleware/protected-routes-middleware");

module.exports = {
  authMiddleware,
  errorHandlerMiddleware,
  notFoundMiddleware,
  routeAccessAllowedFor,
};
