const mongoose = require ('mongoose');
const {Schema} = mongoose;

const PatientSchema = new Schema({
    namepatient : {type: String, required: true, trim: true},
    age : {type: Number, required: true, max:100, trim: true},
    typecancer: {type: String, required: true},
    palliative: {type: Boolean, required: true, default: false},
    services: {type: String, required: true}
        });

module.exports = mongoose.model('Patient', PatientSchema)