const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getRol, getbyRolID } = require("../controllers/roles");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del rol
 *           example: 1
 *         descripcion:
 *           type: string
 *           description: Descripción del rol
 *           example: Administrador
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene la lista de roles
 *     description: Obtiene la lista de roles registrados en el sistema.
 *     tags: [Roles]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       500:
 *         description: Error en el servidor
 */
router.get('/', [validarJWT], getRol)

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtiene un rol por su ID
 *     description: Obtiene los detalles de un rol registrado en el sistema por su ID.
 *     tags: [Roles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol a obtener
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del rol obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', [validarJWT], getbyRolID)


module.exports = router;