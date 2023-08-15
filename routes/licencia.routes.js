const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getLicencia, getbyLicenciaID, postLicencias, putLicencias, deleteLicencias } = require("../controllers/licencias");

const router = Router();

router.get('/', [validarJWT], getLicencia)
router.post('/', [validarJWT], postLicencias)
router.put('/:id', [validarJWT], putLicencias)
router.delete('/:id', [validarJWT], deleteLicencias)
router.get('/:id', [validarJWT], getbyLicenciaID)


module.exports = router;