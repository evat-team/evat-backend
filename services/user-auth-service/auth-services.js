const { NotFoundError, BadRequestError } = require("../../errors");
const bcrypt = require("bcrypt");
const Models = require("../../models");

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new BadRequestError("Please provide an email and password");
  }

  const loggedUser =
    (await Models.NurseModel.findOne({ "user.email": email })) ||
    (await Models.DoctorModel.findOne({ "user.email": email })) ||
    (await Models.ResidentModel.findOne({ "user.email": email })) ||
    (await Models.QaModel.findOne({ "user.email": email }));

  if (!loggedUser) {
    throw new NotFoundError("Email was not founded");
  }

  const result = await bcrypt.compare(password, loggedUser.user.password);

  if (!result) {
    throw new NotFoundError("Incorrect password");
  }

  return loggedUser;
};

module.exports = { login };
