const { Router } = require("express");
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require("../controllers/user.controler");
const { check } = require("express-validator");
const { validator } = require("../middlewares/validator");
const { isRoleValid, isEmailValid, existUserId } = require("../helpers/db-validators");

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', "No es un id valido").isMongoId(),
    check('id').custom(existUserId),
    check('role').custom(isRoleValid),
    validator
], usuariosPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('email', 'Esto debe ser un correo').isEmail(),
    check('email').custom(isEmailValid),
    check('role').custom(isRoleValid),
    validator
], usuariosPost);

router.delete('/:id', [
    check('id', "No es un id valido").isMongoId(),
    check('id').custom(existUserId),
    validator
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;