const { AuthService } = require("../../services");
const { StatusCodes } = require("http-status-codes");
const createToken = require("../../utils/create-token");

const sign_in = async (req, res) => {
  const { email, password } = req.body;

  const loggedUser = await AuthService.singIn(email, password);
  const token = createToken({ ...loggedUser });

  res
    .cookie("jwt", token, { expiresIn: process.env.TOKEN_DURATION })
    .status(StatusCodes.ACCEPTED)
    .json({
      success: "true",
      msg: "usuario loggeado",
    });
};

module.exports = { sign_in };
