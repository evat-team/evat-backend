const {PatientModel} = require ('./../../models');
const {StatusCodes} = require ('http-status-codes');



const getAllPatients = async(req,res)=>{
  const patients = await PatientModel.find();
  res.status(StatusCodes.ACCEPTED).json({
    data: patients,
    success:"true",
  });
};


const getPatient = async (req, res) => {
const {id}= req.params;
const patient = await PatientModel.findById(id);
if (!patient){
  throw new NotFoundError("Paciente no encontrado");
}
res.status(StatusCodes.ACCEPTED).json({
  data: patient,
  success:true,
});

};

const addPatient = async(req, res) => {
const newPatient = await PatientModel.create(req.body);
res.status(StatusCodes.CREATED).json({
  result: newPatient,
  success:"true",
})
};

const updatePatient = async(req, res) => {
  const {id} = req.params;
  const upPatient =await PatientModel.findByIdAndUpdate(
    id,
    {...req.body},
    {new:true,
    runValidators:true,
  }

  
  
  );
  if (!upPatient){
    throw new NotFoundError("no encontrado");
  }
  res.status(StatusCodes.ACCEPTED).json({
    data:upPatient,
    success:"true",
  });
};

const deletePatient = async(req, res) => {
  const {id} = req.params;
  await PatientModel.findByIdAndRemove(id);
  res.status(StatusCodes.ACCEPTED).json({
    data:null,
    success:"true",
  })
};

module.exports = {
  getAllPatients,
  getPatient,
  addPatient,
  deletePatient,
  updatePatient,
};
