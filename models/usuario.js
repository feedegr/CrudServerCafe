
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

    //cambiar el nombre de _id a uid
    UsuarioSchema.method('toJSON', function(){
        const { __v, _id, password, ...object } = this.toObject();
        object.uid = _id;
        return object;
    })

// UsuarioSchema.methods.toJSON = function () {
//     //quitar para que no se vea
//     const { __v, password, ...usuario } = this.toObject();
//     return usuario;
// }

module.exports = model ( 'Usuario', UsuarioSchema);