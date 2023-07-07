const { response } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("usuario", "nombre")
        .populate("categoria", "nombre")
    ]);

    res.json({
        total,
        productos,
    });
};
const obtenerProductoId = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate("usuario", "nombre")
                                                .populate("usuario", "nombre");
    res.json({
        producto,
    });
};
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    if( data.nombre ) {
        data.nombre  = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;
    

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json( producto );
};

const borrarProductoId = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(
        id,
        { estado: false },
        { returnDocument: "after" }
    );

    res.json({ producto });
};

const crearProducto = async (req, res = response) => {
    
    const { estado, usuario, ...body } = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`,
        });
    }
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    };

    const producto = new Producto(data);

    //guardar en db
    await producto.save();

    res.status(201).json(producto);
};

module.exports = {
    crearProducto,
    borrarProductoId,
    obtenerProductos,
    obtenerProductoId,
    actualizarProducto,
};