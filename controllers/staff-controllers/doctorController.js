const {DoctorModel} = require('./../.././models');
const {StatusCodes}= require('http-status-codes');

const getAllDoctors = async(req, res) => {
  const doctors = await DoctorModel.find();
  res.status(StatusCodes.ACCEPTED).json({
    data: doctors,
    success: true,
  });
};

const getDoctor = async(req, res) => {
  const {id} = req.params;
  const doctor = await DoctorModel.findById(id);
  if (!doctor){
    throw new NotFoundError('Doctor no encontrado');
  }
  res.status(StatusCodes.ACCEPTED).json({
    data:doctor,
    success: true,
  })
};

const addDoctor = async(req, res) => {

  const newDoctor = await DoctorModel.create(req.body);
  res.status(StatusCodes.CREATED).json({
    result: newDoctor,
    success: true,
  })
};

const updateDoctor = async(req, res) => {
  const {id} = req.params;
  const upDoctor = await DoctorModel.findByIdAndUpdate(
    id,
    {...req.body},
    {new:true,
    runValidators: true},
    );
    if (!upDoctor){
      throw new NotFoundError('Algo salio mal!');
    }
    res.status(StatusCodes.ACCEPTED).json({
      data:upDoctor,
      success: true,
    })
  
};

const deleteDoctor = async(req, res) => {
  const {id} = req.params;
  await DoctorModel.findByIdAndDelete(id);
  res.status(StatusCodes.ACCEPTED).json({
    data: null,
    success: true,
  })

};

module.exports = {
  getAllDoctors,
  getDoctor,
  addDoctor,
  deleteDoctor,
  updateDoctor,
};
