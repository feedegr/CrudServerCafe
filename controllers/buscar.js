const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res=response) => {

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
       return res.json({
            results:(usuario)?[usuario]:[]
        });
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado:true}]
    });


    res.json({
        results: usuarios
    });
}

const buscarCategorias = async (termino = '', res=response) => {
    
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
       return res.json({
            results:(usuario)?[usuario]:[]
        });
    }
    
    const regex = new RegExp(termino, 'i');
    const categoria = await Categoria.find({nombre: regex,estado:true});

    res.json({
        results: categoria
    });
}

// const buscarProductos = async (termino = '', res=response) => {
//     const regex = new RegExp(termino, 'i');
//     const producto = await Producto.find({
//         $or: [{nombre: regex}],
//         $and: [{precio: { $type: 'number' } }]
//     });

//     res.json({
//         results: producto
//     });
// }

const buscarProductos = async (termino = '', res=response) => {
    
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const usuario = await Usuario.findById(termino)
                        .populate('categoria','nombre');
       return res.json({
            results:(usuario)?[usuario]:[]
        });
    }

    const regex = new RegExp(termino, 'i');
    let consulta = {};

    if (!isNaN(parseFloat(termino))) {
        // Si el término es un número, buscar por precio
        consulta = { precio: parseFloat(termino), estado:true };
    } else {
        // Si el término no es un número, buscar por nombre
        consulta = { nombre: regex, estado:true};
    }

    const productos = await Producto.find(consulta).populate('categoria','nombre');

    res.json({
        results: productos
    });
};

const buscar = (req, res=response) => {
    
    const {coleccion, termino} = req.params;
    
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas}`
        })
    }


    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res);
        break;
        case 'categorias':
            buscarCategorias(termino,res)
        break;
        case 'productos':
            buscarProductos(termino,res)
        break;
        case 'roles':
        break;

        default:
            res.status(500).json({
                msg: 'Esta busqueda no esta implementada'
            })
    }
}

module.exports = {
    buscar
}