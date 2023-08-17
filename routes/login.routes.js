const { Router } = require("express");
const { Login } = require("../controllers/login");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: Nombre de usuario autenticado
 *           example: usuario123
 *         rol:
 *           type: integer
 *           description: ID del rol del usuario autenticado
 *           example: 2
 *         token:
 *           type: string
 *           description: Token de autenticación generado
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ1aWQiLCJpYXQiOjE2MzA1MzI2MzZ9.vi6fK_B8U7x5gkg8F55Ot9mc2g5UQXVlKnHbvi-VHrA
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Iniciar sesión
 *     description: Iniciar sesión con credenciales de usuario.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: usuario123
 *               clave:
 *                 type: string
 *                 description: Clave del usuario
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */
router.post('/', Login)

module.exports = router;