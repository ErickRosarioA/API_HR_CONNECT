const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getTipoDocumento, getbyTipoDocumentoID } = require("../controllers/tipodocumento");

const router = Router();

router.get('/', [validarJWT], getTipoDocumento)
// router.post('/', [validarJWT], postDepartamentos)
router.get('/:id', [validarJWT], getbyTipoDocumentoID)


module.exports = router;