const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getDepartamento, getbyDepartamentoID, postDepartamentos } = require("../controllers/departamento");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Departamento:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del departamento
 *           example: 1
 *         descripcion:
 *           type: string
 *           description: Descripción del departamento
 *           example: Ventas
 * 
 * /api/departamentos:
 *   get:
 *     summary: Obtiene la lista de departamentos
 *     description: Obtiene la lista de departamentos registrados con sus detalles.
 *     tags: [Departamentos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de departamentos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Departamento'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       500:
 *         description: Error en el servidor
 */
router.get('/', [validarJWT], getDepartamento)

/**
 * @swagger
 * /api/departamentos/{id}:
 *   get:
 *     summary: Obtiene los detalles de un departamento por su ID
 *     description: Obtiene los detalles de un departamento registrado en el sistema según su ID.
 *     tags: [Departamentos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento a obtener detalles
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del departamento obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', [validarJWT], getbyDepartamentoID)


/**
 * @swagger
 * /api/departamentos:
 *   post:
 *     summary: Agrega un nuevo departamento
 *     description: Agrega un nuevo departamento al sistema.
 *     tags: [Departamentos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Descripcion:
 *                 type: string
 *                 description: Descripción del nuevo departamento
 *                 example: Ventas
 *     responses:
 *       200:
 *         description: Departamento agregado exitosamente
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       500:
 *         description: Error en el servidor
 */
router.post('/', [validarJWT], postDepartamentos)



module.exports = router;