const { response, request } = require('express')
const bcrypt = require('bcryptjs');
const User = require('../models/user')

const usuariosGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    });
}

const usuariosPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        user
    });
}

const usuariosDelete = async (req, res = response) => {

    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, { state: false });

    res.json(user);
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