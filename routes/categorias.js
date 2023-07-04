const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require("../middlewares");
const { crearCategoria, borrarCategoria, obtenerCategorias, obtenerCategoriaId } = require("../controllers/categorias");
const { existeCategoria,esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

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
router.put("/:id", (req, res) => {
  res.json("put");
});

//borrar cateogira admin
router.delete("/:id",[
  check('id', 'No es un id valido').isMongoId(),
  validarCampos
], borrarCategoria);

module.exports = router;
