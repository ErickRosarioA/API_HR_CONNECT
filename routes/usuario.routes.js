const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, getbyUsuariosID } = require("../controllers/usuarios");

const router = Router();

router.get('/', [validarJWT], getUsuarios)
router.post('/', [validarJWT], postUsuarios)
router.put('/:id', [validarJWT], putUsuarios)
router.delete('/:id', [validarJWT], deleteUsuarios)
router.get('/:id', [validarJWT], getbyUsuariosID)


module.exports = router;