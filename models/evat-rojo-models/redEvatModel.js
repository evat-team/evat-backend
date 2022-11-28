const mongoose = require('mongoose');

const medicalResponseSchema = mongoose.Schema({
    mes:{enum:["Enero", "Febrero", "Marzo","Abril", "Mayo", "Junio",
    "Julio", "Agosto","Septiembre","Octubre", "Noviembre", "Diciembre"]
    , type:String},

    fechaPrimerevat:{type:Date},

    horaPrimerevat:{type:Number}


});

module.exports=mongoose.model("medicalResponse",medicalResponseSchema)