const { Router } = require('express');
const { check } = require('express-validator');



//const { validarJWT } = require('../midddlewares/validar-jwt');
//const { validarCampos } = require('../midddlewares/validar-campos');

const {
    validarJWT,
    validarCampos,
    esAdminRole,
    tieneRole

} = require('../midddlewares');

const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');
//const { esAdminRole, tieneRole } = require('../midddlewares/validar-roles');


const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [

    check('id', ' No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 caracteres').isLength({ min: 6 }),
    check('correo').custom(existeEmail),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),

    validarCampos

], usuariosPost);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
    check('id', ' No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;