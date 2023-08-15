const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getRol, getbyRolID } = require("../controllers/roles");

const router = Router();

router.get('/', [validarJWT], getRol)
router.get('/:id', [validarJWT], getbyRolID)


module.exports = router;