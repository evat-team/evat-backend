const {MedicalResponseModel} = require('./../../models')
const {StatusCodes} = require ('http-status-codes');

const getAllMedicalResponses = async(req, res) => {
  const medicalResponses = await MedicalResponseModel.find();
  res.status(StatusCodes.ACCEPTED).json({
    data:medicalResponses,
    success:"true"
  });
};

const getMedicalResponse = async (req, res) => {
  const {id}= req.params;
  const medicalResponse = await MedicalResponseModel.findById(id);
  if (!medicalResponse){
    throw new NotFoundError("Respuest Medica No Encontrada")
  }
  res.status(StatusCodes.ACCEPTED).json({
    data: medicalResponse,
    success: true,
  });
};

const addMedicalResponse = async (req, res) => {
  const newMedicalResponse = await MedicalResponseModel.create(req.body);
  res.status(StatusCodes.CREATED).json({
    result: newMedicalResponse,
    success: "true",
  });
};

const updateMedicalResponse = async(req, res) => {
  const {id} = req.params;
  const upMedicalResponse = await MedicalResponseModel.findByIdAndUpdate(
    id,
    {...req.body},
    {new:true,
    runValidators:true,
  }
  );
  if(!upMedicalResponse){
    throw new NotFoundError("No encontrado");
  }
  res.status(StatusCodes.ACCEPTED).json({
    data: upMedicalResponse,
    success: "true",
  });
};

const deleteMedicalResponse = async(req, res) => {
  const {id}= req.params;
  await MedicalResponseModel.findByIdAndRemove(id);
  res.status(StatusCodes.ACCEPTED).json({
    data: null,
    success: "true",
  });
};

module.exports = {
  getAllMedicalResponses,
  getMedicalResponse,
  addMedicalResponse,
  deleteMedicalResponse,
  updateMedicalResponse,
};
