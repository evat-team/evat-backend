const { RedEvatModel } = require("../../models");
const { NotFoundError } = require("../../errors");

class RedEvatService {
  async returnAllRedEvats() {
    const redEvats = await RedEvatModel.find();

    return redEvats;
  }

  async returnRedEvatById(id) {
    const redEvat = await RedEvatModel.findById(id);

    if (!redEvat) {
      throw new NotFoundError("Red Evat form was not found");
    }

    return redEvat;
  }

  async createRedEvat(evatForm) {
    const redEvat = await RedEvatModel.create({ ...evatForm });

    return redEvat;
  }

  async updateRedEvatById(id, newEvatForm) {
    const newRedEvat = await RedEvatModel.findByIdAndUpdate(
      id,
      { ...newEvatForm },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newRedEvat) {
      throw new NotFoundError("Red Evat Form was not found");
    }

    return newRedEvat;
  }

  async deleteRedEvatById(id) {
    const redEvatRemoved = await RedEvatModel.findByIdAndRemove(id);

    if (!redEvatRemoved) {
      throw new NotFoundError("Red Evat Form was not found");
    }

    return redEvatRemoved;
  }
}

module.exports = new RedEvatService();
