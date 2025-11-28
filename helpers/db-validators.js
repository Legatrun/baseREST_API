const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (rol = "") => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol ${rol} no existe`);
    }
}

const isEmailValid = async (email = "") => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`El correo ${email} ya existe`);
    }
}

const existUserId = async (id) => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`El usuario ${id} no existe`);
    }
}

module.exports = {
    isRoleValid,
    isEmailValid,
    existUserId
}