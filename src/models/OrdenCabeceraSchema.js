const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ordenCabeceraSchema = new Schema({
    nombrePersona : {
        type : String,
        required : true,
        maxlength: 64,
    },
    apellidoPersona : {
        type : String,
        requred : true,
        maxlength : 64
    },

    estado : {
        type : String,
        required : true
    },
    detalles : [
        {
            cantidad : {
                type : Number,
                required : true
            }, 
            productoId : {
                type : Schema.Types.ObjectId,
                ref : "Producto",
                required : true
            }
        }
    ]

});

const Orden = mongoose.model('Orden', ordenCabeceraSchema);

module.exports = Orden;

