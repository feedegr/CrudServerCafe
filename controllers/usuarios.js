const { response } = require('express');


const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'get API = controller'
    });
}


const usuariosPost = (req, res = response) => {
    
    res.json({
        msg: 'post API - controller'
    });
}

const usuariosPut = (req, res = response) => {
    
    const id = req.params.id;
    
    res.json({
        msg: 'put API - controller'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}