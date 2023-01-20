const { AuthService } = require("../../services");
const { StatusCodes } = require("http-status-codes");
const createToken = require("../../utils/create-token");

// @ desc    Sign in to the application
// @ access  Public
// @ method  POST
const signIn = async (req, res) => {
  const { email, password } = req.body;

  const loggedUser = await AuthService.singIn(email, password);
  const token = createToken({ ...loggedUser });

  res
    .cookie("jwt", token, { expiresIn: process.env.TOKEN_DURATION })
    .status(StatusCodes.ACCEPTED)
    .json({
      result: loggedUser,
      success: "true",
      msg: "usuario loggeado",
    });
};

module.exports = { signIn };
