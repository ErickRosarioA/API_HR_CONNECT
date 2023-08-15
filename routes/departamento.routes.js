const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getDepartamento, getbyDepartamentoID, postDepartamentos } = require("../controllers/departamento");

const router = Router();

router.get('/', [validarJWT], getDepartamento)
router.post('/', [validarJWT], postDepartamentos)
router.get('/:id', [validarJWT], getbyDepartamentoID)


module.exports = router;