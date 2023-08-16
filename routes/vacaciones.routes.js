const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getVacaciones, getbyVacacionesID, postVacaciones, putVacaciones, deleteVacaciones } = require("../controllers/vacaciones");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Vacacion:
 *       type: object
 *       properties:
 *         EmpleadoID:
 *           type: integer
 *           description: ID del empleado que solicitó la vacación
 *           example: 1
 *         Nombre:
 *           type: string
 *           description: Nombre del empleado
 *           example: María López
 *         FechaInicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la vacación
 *           example: 2023-08-20
 *         FechaFin:
 *           type: string
 *           format: date
 *           description: Fecha de fin de la vacación
 *           example: 2023-08-25
 *         Aprobada:
 *           type: boolean
 *           description: Indica si la vacación está aprobada
 *           example: true
 */

/**
 * @swagger
 * /api/vacaciones:
 *   get:
 *     summary: Obtiene la lista de vacaciones
 *     description: Obtiene la lista de vacaciones registradas en el sistema con sus detalles.
 *     tags: [Vacaciones]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vacaciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vacacion'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       500:
 *         description: Error en el servidor
 */
router.get('/', [validarJWT], getVacaciones)

/**
 * @swagger
 * /api/vacaciones/{id}:
 *   get:
 *     summary: Obtiene detalles de una vacación por ID
 *     description: Obtiene los detalles de una vacación específica por su ID.
 *     tags: [Vacaciones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la vacación a obtener detalles
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles de la vacación obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacacion'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       404:
 *         description: Vacación no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', [validarJWT], getbyVacacionesID)

/**
 * @swagger
 * /api/vacaciones:
 *   post:
 *     summary: Agrega una nueva solicitud de vacaciones
 *     description: Agrega una nueva solicitud de vacaciones al sistema.
 *     tags: [Vacaciones]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EmpleadoID:
 *                 type: integer
 *                 description: ID del empleado que solicita las vacaciones
 *                 example: 1
 *               FechaInicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de las vacaciones
 *                 example: 2023-08-20
 *               FechaFin:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin de las vacaciones
 *                 example: 2023-08-25
 *               Aprobada:
 *                 type: boolean
 *                 description: Indica si la solicitud de vacaciones ha sido aprobada
 *                 example: false
 *     responses:
 *       200:
 *         description: Solicitud de vacaciones agregada exitosamente
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       500:
 *         description: Error en el servidor
 */
router.post('/', [validarJWT], postVacaciones)

/**
 * @swagger
 * /api/vacaciones/{id}:
 *   put:
 *     summary: Actualiza una solicitud de vacaciones existente
 *     description: Actualiza los datos de una solicitud de vacaciones existente en el sistema.
 *     tags: [Vacaciones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la solicitud de vacaciones a actualizar
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EmpleadoID:
 *                 type: integer
 *                 description: ID del empleado que solicita las vacaciones
 *                 example: 1
 *               FechaInicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de las vacaciones
 *                 example: 2023-08-20
 *               FechaFin:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin de las vacaciones
 *                 example: 2023-08-25
 *               Aprobada:
 *                 type: boolean
 *                 description: Indica si la solicitud de vacaciones ha sido aprobada
 *                 example: true
 *     responses:
 *       200:
 *         description: Solicitud de vacaciones actualizada exitosamente
 *       404:
 *         description: Solicitud de vacaciones no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', [validarJWT], putVacaciones)

/**
 * @swagger
 * /api/vacaciones/{id}:
 *   delete:
 *     summary: Elimina una solicitud de vacaciones
 *     description: Elimina una solicitud de vacaciones existente en el sistema.
 *     tags: [Vacaciones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la solicitud de vacaciones a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Solicitud de vacaciones eliminada exitosamente
 *       404:
 *         description: Solicitud de vacaciones no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', [validarJWT], deleteVacaciones)



module.exports = router;