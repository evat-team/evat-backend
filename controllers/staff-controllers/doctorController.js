const { StatusCodes } = require("http-status-codes");
const { doctorService } = require("../../services");

const getAllDoctors = async (req, res) => {
  const doctors = await doctorService.returnAllDoctors();

  res.status(StatusCodes.OK).json({
    data: doctors,
    noResults: doctors.length,
    success: true,
  });
};

const getDoctor = async (req, res) => {
  const { id } = req.params;
  const doctor = await doctorService.returnDoctorById(id);

  res.status(StatusCodes.OK).json({
    data: doctor,
    success: true,
  });
};

const addDoctor = async (req, res) => {
  const newDoctor = await doctorService.createDoctor({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newDoctor,
    success: true,
  });
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;

  const updatedDoctor = await doctorService.updateDoctorById(id, {
    ...req.body,
  });

  res.status(StatusCodes.OK).json({
    data: updatedDoctor,
    success: true,
  });
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  const deletedDoctor = await doctorService.deleteDoctorById(id);

  res.status(StatusCodes.OK).json({
    data: deletedDoctor,
    success: true,
  });
};

module.exports = {
  getAllDoctors,
  getDoctor,
  addDoctor,
  deleteDoctor,
  updateDoctor,
};
