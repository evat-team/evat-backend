const { ResidentModel } = require("../../models");
const { NotFoundError } = require("../../errors");

const returnAllResident = async () => {
  const residents = await ResidentModel.find();

  return residents;
};

const returnResidentById = async (id) => {
  const resident = await ResidentModel.findById(id);

  if (!resident) {
    throw new NotFoundError("Residente no encontrado");
  }

  return resident;
};

const createResident = async (userInfo) => {
  const newResident = await ResidentModel.create({ ...userInfo });

  return newResident;
};

const updateResidentById = async (id, newUserData) => {
  const residentUpdated = await ResidentModel.findByIdAndUpdate(
    id,
    { ...newUserData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!residentUpdated) {
    throw new NotFoundError("Residente was not founded");
  }

  return residentUpdated;
};

const removeResidentById = async (id) => {
  const removedResident = await ResidentModel.findByIdAndRemove(id);

  if (!removedResident) {
    throw new NotFoundError("Resident was not founded");
  }

  return removedResident;
};

module.exports = {
  returnAllResident,
  returnResidentById,
  createResident,
  updateResidentById,
  removeResidentById,
};
