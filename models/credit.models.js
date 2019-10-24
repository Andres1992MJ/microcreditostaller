let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let creditSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    valor: {
        type: Number,
        required: true
    },
    plazo: {
        type: Number,
        required: true
    },
    interes: {
        type: Number,
        default: 0.02
    },
    cuotaMensual: {
        type: Number
           },
    solicitud: {
        type: Boolean,
        default: true
    },
    aprobado: {
        type: Boolean,
        default: false
    },
    fechaSolicitud: {
        type: Date,
        default: Date.now
    },
    fechaAprobacion: {
        type: Date,

    },
});

module.exports = mongoose.model('Credit', creditSchema);