const { ForbiddenError } = require("../../errors");

const routeAccessAllowedfor = (...roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      throw new ForbiddenError(
        "You do not have permission to access this resource"
      );
    }
  };
};

module.exports = routeAccessAllowedfor;
