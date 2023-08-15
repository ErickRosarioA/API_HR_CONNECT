const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getVacaciones, getbyVacacionesID, postVacaciones, putVacaciones, deleteVacaciones } = require("../controllers/vacaciones");

const router = Router();

router.get('/', [validarJWT], getVacaciones)
router.post('/', [validarJWT], postVacaciones)
router.put('/:id', [validarJWT], putVacaciones)
router.delete('/:id', [validarJWT], deleteVacaciones)
router.get('/:id', [validarJWT], getbyVacacionesID)


module.exports = router;