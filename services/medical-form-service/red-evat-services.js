const { RedEvatModel } = require("../../models");
const { NotFoundError } = require("../../errors");

const returnAllRedEvats = async () => {
  const redEvats = await RedEvatModel.find();

  return redEvats;
};

const returnRedEvatById = async (id) => {
  const redEvat = await RedEvatModel.findById(id);

  if (!redEvat) {
    throw new NotFoundError("Red evat not founded");
  }

  return redEvat;
};

const createRedEvat = async (evatForm) => {
  const redEvat = await RedEvatModel.create({ ...evatForm });

  return redEvat;
};

const updateRedEvatById = async (id, newEvatForm) => {
  const newRedEvat = await RedEvatModel.findByIdAndUpdate(
    id,
    { ...newEvatForm },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!newRedEvat) {
    throw new NotFoundError("Evat Form was not founded");
  }

  return newRedEvat;
};

const deleteRedEvatById = async (id) => {
  const redEvatRemoved = await RedEvatModel.findByIdAndRemove(id);

  if (!redEvatRemoved) {
    throw new NotFoundError("Red Evat was not founded");
  }

  return redEvatRemoved;
};

module.exports = {
  returnAllRedEvats,
  returnRedEvatById,
  createRedEvat,
  updateRedEvatById,
  deleteRedEvatById,
};
