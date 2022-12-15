const { NotFoundError, BadRequestError } = require("../../errors");
const bcrypt = require("bcrypt");
const { EmployeeModel } = require("../../models");

class AuthService {
  async singIn(email, password) {
    if (!email || !password) {
      throw new BadRequestError("Please provide an email and password");
    }

    const loggedUser = await EmployeeModel.findOne({ email });

    if (!loggedUser) {
      throw new NotFoundError("Email was not found");
    }

    const result = await bcrypt.compare(password, loggedUser.password);

    if (!result) {
      throw new NotFoundError("Incorrect password");
    }

    return loggedUser;
  }
}

module.exports = new AuthService();
