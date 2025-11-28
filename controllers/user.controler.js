const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = "no name", apiKey, page = 1, limit = 10 } = req.query;

    res.json({
        message: 'Controlador get',
        q,
        nombre,
        apiKey,
        page,
        limit
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        message: 'Controlador post',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        message: 'Controlador put',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        message: 'Controlador delete'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        message: 'Controlador patch'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}