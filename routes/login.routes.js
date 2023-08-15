const { Router } = require("express");
const { Login } = require("../controllers/login");

const router = Router();


router.post('/', Login)

module.exports = router;