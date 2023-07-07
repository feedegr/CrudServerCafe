const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");
const { existeProducto, existeCategoria } = require('../helpers/db-validators');
const { obtenerProductos, obtenerProductoId, crearProducto, actualizarProducto, borrarProductoId } = require("../controllers/productos");

const router = Router();

//obtener cateogiras
router.get("/", obtenerProductos );

//obtener una producto por id 
router.get("/:id",[ 
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos,
 ], obtenerProductoId ); 
//crear producto - privado
router.post("/",[ 
  validarJWT,
  check('nombre','El nombre es obligatorio').notEmpty(),
  check('categoria','No es id de Mongo').isMongoId(),
  check('categoria').custom(existeCategoria),
  validarCampos
], crearProducto);
//actualizar - privado
router.put("/:id", [
  validarJWT,
 // check('categoria','No es id de Mongo').isMongoId(),
  check('id').custom(existeProducto),
  validarCampos
], actualizarProducto );

//borrar producto admin
router.delete("/:id",[
  validarJWT,
  esAdminRole,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeProducto),
  validarCampos
], borrarProductoId);

module.exports = router;
