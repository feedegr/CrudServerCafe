
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');


const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'nombre obligatorio').not().isEmpty(),
    check('password', 'password obligatorio y mas de 6 letras').isLength({ min: 6}),
    check('correo', 'correo invalido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol',).custom( esRoleValido ),
    // check('rol', 'no rol válido').isIn('ADMIN_ROLE', 'USER_ROLE'),
    validarCampos,
] ,usuariosPost);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol',).custom( esRoleValido ),
    validarCampos
],usuariosPut);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos,
] ,usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;