const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");
const { crearCategoria, borrarCategoria, obtenerCategorias, obtenerCategoriaId, actualizarCategoria } = require("../controllers/categorias");
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

//obtener cateogiras
router.get("/", obtenerCategorias );

//obtener una categoria por id 
router.get("/:id",[ 
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
 ], obtenerCategoriaId ); 
//crear categoria - privado
router.post("/",[ 
  validarJWT,
  check('nombre','El nombre es obligatorio').notEmpty(),
  validarCampos
], crearCategoria);
//actualizar - privado
router.put("/:id", [
  validarJWT,
  check('nombre','El nombre es obligatorio').notEmpty(),
  check('id').custom(existeCategoria),
  validarCampos
], actualizarCategoria );

//borrar cateogira admin
router.delete("/:id",[
  validarJWT,
  esAdminRole,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos
], borrarCategoria);

module.exports = router;
