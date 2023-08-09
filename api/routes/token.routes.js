const { Router } = require("express");
const getToken = require("../helpers/generarToken");

const router = Router();

router.get( '/', getToken);


module.exports = router;