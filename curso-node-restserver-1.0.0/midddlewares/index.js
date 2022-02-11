const validarJWT = require('../midddlewares/validar-jwt');
const validarCampos = require('../midddlewares/validar-campos');
const validaRoles = require('../midddlewares/validar-roles');


module.exports = {

    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}