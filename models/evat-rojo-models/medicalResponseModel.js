const mongoose = require('mongoose');

const redEvatSchema = mongoose.Schema({
    consultaUCI:{enum:["Si","No"]
    ,type:String},

    horaConsulta:{type:Number},
    intervencion:{enum:["Uci", "Pedi"]
    ,type:String},
    horaIntervencion:{type:Number},
    tipoIntervencion:{type:String},
    duracionEvat:{type:Number}

});
module.exports=mongoose.model("redEvat",redEvatSchema)