const {RedEvatModel}= require ('./../../models');
const {StatusCodes} = require ('http-status-codes');


const getAllRedEvats = async (req, res) => {
  const primerEvat = await RedEvatModel.find();
  res.status(StatusCodes.ACCEPTED).json({
    data: primerEvat,
    success: "true",
  });
};

const getRedEvat = async (req, res) => {
  const {id} = req.params;
  const Redevat = await RedEvatModel.findById(id);
  if (!Redevat){
    throw new NotFoundError("Red evat no encontrado");
  }
  res.status(StatusCodes.ACCEPTED).json({
    data: Redevat,
    success: "true",
  });
};

const addRedEvat = async (req, res) => {
  const newRedevat = await RedEvatModel.create(req.body);
  res.status(StatusCodes.CREATED).json({
    result: newRedevat,
    success: "true",
  });
};

const updateRedEvat = async (req, res) => {
  const {id} = req.params;
  const upRedevat = await RedEvatModel.findByIdAndUpdate(
    id,
    {...req.body},
    {new:true,
    runValidators:true,
  }
  );
  if (!upRedevat){
    throw new NotFoundError("No encontrado");
  }
  res.status(StatusCodes.ACCEPTED).json({
    data:upRedevat,
    success: "true",
  });
};

const deleteRedEvat = async (req, res) => {
  const {id} = req.params;
  await RedEvatModel.findByIdAndRemove(id);
  res.status(StatusCodes.ACCEPTED).json({
    data:null,
    success: "true",
  });
};

module.exports = {
  getAllRedEvats,
  getRedEvat,
  addRedEvat,
  deleteRedEvat,
  updateRedEvat,
};
