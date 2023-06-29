const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const usuario = require("../models/usuario");

const usuariosGet = async (req, res = response) => {
  
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  
  //    const usuarios = await Usuario.find(query)
  //      //number para transformar en numero
  //      .skip(Number(desde))
  //      .limit(Number(limite));

  //    const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encripta contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guarda en BD
  await usuario.save();

  res.json({
    msg: "Registrado",
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // Validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "Cambio Actualizado",
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
    
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false },{returnDocument:'after'});
  
  res.json({usuario});
};



module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
