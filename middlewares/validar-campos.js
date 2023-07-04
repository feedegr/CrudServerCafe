const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const mensajesError = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: mensajesError });
    }

    next();
}

module.exports = {
    validarCampos
}