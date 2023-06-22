
const { Schema, model } = require ('mongoose');

const UsuarioSchema = Schema ({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    password:{
        type: String,
        required: [true, 'constraseña obligatoria']
    },

    img:{
        type: String,
    },

    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },

})

UsuarioSchema.methods.toJSON = function() {
    //quitar para que no se vea
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model ( 'Usuario', UsuarioSchema);