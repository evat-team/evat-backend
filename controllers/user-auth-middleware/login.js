const { NurseModel } = require("../../models");
const bcrypt = require("bcrypt");
const { NotFoundError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { idWorker, pass } = req.body;

  const nurse = await NurseModel.findOne({ idWorker });

  if (nurse) {
    const result = await bcrypt.compare(pass, nurse.password);

    if (!result) {
      throw new NotFoundError("Contrasena incorrecta");
    } else {
      res.status(StatusCodes.ACCEPTED).json({
        success: "true",
        login: "usuario loggeado",
      });
    }
  } else {
    throw new NotFoundError("No se ha encontrado matricula");
  }
};

module.exports = login;
