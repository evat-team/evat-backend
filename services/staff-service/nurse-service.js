const { NurseModel } = require("../../models");
const { NotFoundError } = require("../../errors");

const returnAllNurses = async () => {
  const nurses = await NurseModel.find();
  return nurses;
};

const returnNurseById = async (id) => {
  const nurse = await NurseModel.findById(id);

  if (!nurse) {
    throw new NotFoundError("Nurse not founded");
  }

  return nurse;
};

const createNurse = async (newUser) => {
  const newNurse = await NurseModel.create({ ...newUser });

  return newNurse;
};

const updateNurseById = async (id, userNewInfo) => {
  const nurseUpdated = await NurseModel.findByIdAndUpdate(
    id,
    { ...userNewInfo },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!nurseUpdated) {
    throw new NotFoundError("Nurse not founded");
  }

  return nurseUpdated;
};

const deleteNurseById = async (id) => {
  const nurseDeleted = await NurseModel.findByIdAndRemove(id);

  if (!nurseDeleted) {
    throw new NotFoundError("Nurse not founded");
  }

  return nurseDeleted;
};

module.exports = {
  returnAllNurses,
  returnNurseById,
  createNurse,
  updateNurseById,
  deleteNurseById,
};
