const { QaModel } = require("../../models");
const { NotFoundError } = require("../../errors");

const returnAllQas = async () => {
  const qas = await QaModel.find();

  return qas;
};

const returnQaById = async (id) => {
  const qa = await QaModel.findById(id);

  if (!qa) {
    throw new NotFoundError("Qa was not founded");
  }

  return qa;
};

const createQa = async (userInfo) => {
  const newQa = await QaModel.create({ ...userInfo });

  return newQa;
};

const deleteQaById = async (id) => {
  const qaRemoved = await QaModel.findByIdAndRemove(id);

  if (!qaRemoved) {
    throw new NotFoundError("Qa was not founded");
  }

  return qaRemoved;
};

const updateQaById = async (id, newUserData) => {
  const qaUpdated = await QaModel.findByIdAndUpdate(
    id,
    { ...newUserData },
    { new: true, runValidators: true }
  );

  if (!qaUpdated) {
    throw new NotFoundError("Qa was not founded");
  }

  return qaUpdated;
};

module.exports = {
  returnAllQas,
  returnQaById,
  createQa,
  deleteQaById,
  updateQaById,
};
