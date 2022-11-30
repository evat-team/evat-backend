const mongoose = require("mongoose");
const User = require("./userSchema");

const qaSchema = mongoose.Schema({
  user: {
    type: User,
    required: true,
  },
});

const QaModel = mongoose.model("Qa", qaSchema);

module.exports = QaModel;
