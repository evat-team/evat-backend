const { authService } = require("../../services");
const { StatusCodes } = require("http-status-codes");
const createToken = require("../../utils/create-token");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const loggedUser = await authService.login({ email, password });
  const token = createToken({ ...loggedUser });

  res
    .cookie("jwt", token, { expiresIn: process.env.TOKEN_DURATION })
    .status(StatusCodes.ACCEPTED)
    .json({
      success: "true",
      msg: "usuario loggeado",
    });
};

module.exports = { loginController };
