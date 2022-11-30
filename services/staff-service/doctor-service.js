const { DoctorModel } = require("../../models");
const { NotFoundError } = require("../../errors");

const returnAllDoctors = async () => {
  const doctors = await DoctorModel.find();
  return doctors;
};

const returnDoctorById = async (id) => {
  const doctor = await DoctorModel.findById(id);

  if (!doctor) {
    throw new NotFoundError("Doctor no encontrado");
  }

  return doctor;
};

const createDoctor = async (newUser) => {
  const newDoctor = await DoctorModel.create({ ...newUser });
  return newDoctor;
};

const updateDoctorById = async (id, newUserData) => {
  const updatedDoctor = await DoctorModel.findByIdAndUpdate(
    id,
    { ...newUserData },
    { new: true, runValidators: true }
  );

  if (!updatedDoctor) {
    throw new NotFoundError("No se encountro ningun doctor");
  }

  return updatedDoctor;
};

const deleteDoctorById = async (id) => {
  const doctorDeleted = await DoctorModel.findByIdAndDelete(id);

  if (!doctorDeleted) {
    throw new NotFoundError("Patient not founded");
  }

  return doctorDeleted;
};

module.exports = {
  returnAllDoctors,
  returnDoctorById,
  createDoctor,
  updateDoctorById,
  deleteDoctorById,
};
