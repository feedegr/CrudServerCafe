const { Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El rol es obligatorio'],
        unique: true,
    },
    estado:{
        type:Boolean,
        default: true,
        required:true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
});

 CategoriaSchema.method('toJSON', function(){
    const { __v, estado, ...object } = this.toObject();
    return object;
})

module.exports = model ( 'Categoria', CategoriaSchema );