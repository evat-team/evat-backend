const Models = require("../../models");
const bcrypt = require("bcrypt");
const { NotFoundError, BadRequestError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");
const createToken = require("../../utils/create-token");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide an email and password");
  }

  const loggedUser =
    (await Models.NurseModel.findOne({ "user.email": email })) ||
    (await Models.DoctorModel.findOne({ "user.email": email })) ||
    (await Models.ResidentModel.findOne({ "user.email": email })) ||
    (await Models.QaModel.findOne({ "user.email": email }));

  if (loggedUser) {
    const result = await bcrypt.compare(password, loggedUser.user.password);

    if (!result) {
      throw new NotFoundError("Incorrect password");
    } else {
      const token = createToken({ ...loggedUser });

      res
        .cookie("jwt", token, { expiresIn: process.env.TOKEN_DURATION })
        .status(StatusCodes.ACCEPTED)
        .json({
          success: "true",
          msg: "usuario loggeado",
        });
    }
  } else {
    throw new NotFoundError("Email not founded");
  }
};

module.exports = { loginController };
