const mongoose = require ('mongoose');
const {Schema} = mongoose;

const DoctorSchema = new Schema({
    namedoctor: {type: String, required: true, trim: true},
    matricula: {type: Number, required: true},
    tell: {type: Number, required: true},
    password: {type: String, required: true, minLength:8},
    speciality: {type: String, required: true}
})

module.exports = mongoose.model('Doctor',DoctorSchema);

