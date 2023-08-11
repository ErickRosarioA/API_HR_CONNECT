const { Router } = require("express");
const { getEmpleados, getbyID, postEmpleados, putEmpleados, deleteEmpleados } = require("../controllers/empleados");
const { validarJWT } = require("../middlewares/validarJWT");

const router = Router();

router.get('/', [validarJWT], getEmpleados)
router.post('/', [validarJWT], postEmpleados)
router.put('/:id', [validarJWT], putEmpleados)
router.delete('/:id', [validarJWT], deleteEmpleados)
router.get('/:id', [validarJWT], getbyID)


module.exports = router;