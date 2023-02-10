const { NotFoundError, BadRequestError } = require("../../errors");
const bcrypt = require("bcrypt");
const { EmployeeModel } = require("../../models");

/**
 * @class Provides the functions to validate the user authentication
 */
class AuthService {
  /**
   *
   * @param {String} email Employee email
   * @param {String} password Employee password
   * @returns Employee logged
   * @throws {BadRequestError | NotFoundError}
   */
  async singIn(email, password) {
    if (!email || !password) {
      throw new BadRequestError("Please provide an email and password");
    }

    const loggedUser = await EmployeeModel.findOne({ email }).select(
      "+password"
    );

    if (!loggedUser) {
      throw new NotFoundError("Email was not found");
    }

    const result = await bcrypt.compare(password, loggedUser.password);

    if (!result) {
      throw new NotFoundError("Incorrect password");
    }

    delete loggedUser.password;

    return loggedUser;
  }
}

module.exports = new AuthService();
