const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getLicencia, getbyLicenciaID, postLicencias, putLicencias, deleteLicencias } = require("../controllers/licencias");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Licencia:
 *       type: object
 *       properties:
 *         EmpleadoID:
 *           type: integer
 *           description: ID del empleado asociado a la licencia
 *           example: 1
 *         Nombre:
 *           type: string
 *           description: Nombre del empleado asociado a la licencia
 *           example: Juan Pérez
 *         Tipo:
 *           type: string
 *           description: Tipo de licencia
 *           example: Enfermedad
 *         FechaInicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la licencia
 *           example: 2023-08-15
 *         FechaFin:
 *           type: string
 *           format: date
 *           description: Fecha de fin de la licencia
 *           example: 2023-08-20
 *         Comentarios:
 *           type: string
 *           description: Comentarios adicionales sobre la licencia
 *           example: Reposo médico por gripe
 * 
 * /api/licencias:
 *   get:
 *     summary: Obtiene la lista de licencias
 *     description: Obtiene la lista de licencias registradas con sus detalles.
 *     tags: [Licencias]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de licencias obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Licencia'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       404:
 *         description: No se ha encontrado registros de licencias
 *       500:
 *         description: Error en el servidor
 */
router.get('/', [validarJWT], getLicencia)


/**
 * @swagger
 * /api/licencias/{id}:
 *   get:
 *     summary: Obtiene los detalles de una licencia por su ID
 *     description: Obtiene los detalles de una licencia registrada en el sistema según su ID.
 *     tags: [Licencias]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la licencia a obtener detalles
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles de la licencia obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Licencia'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       404:
 *         description: Licencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', [validarJWT], getbyLicenciaID)

/**
 * @swagger
 * /api/licencias:
 *   post:
 *     summary: Agrega una nueva licencia
 *     description: Agrega una nueva licencia al sistema.
 *     tags: [Licencias]
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
 *                 description: ID del empleado asociado a la licencia
 *                 example: 1
 *               Tipo:
 *                 type: string
 *                 description: Tipo de licencia
 *                 example: Enfermedad
 *               FechaInicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la licencia
 *                 example: 2023-08-15
 *               FechaFin:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin de la licencia
 *                 example: 2023-08-20
 *               Comentarios:
 *                 type: string
 *                 description: Comentarios adicionales sobre la licencia
 *                 example: Reposo médico por gripe
 *     responses:
 *       200:
 *         description: Licencia agregada exitosamente
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       500:
 *         description: Error en el servidor
 */
router.post('/', [validarJWT], postLicencias)

/**
 * @swagger
 * /api/licencias/{id}:
 *   put:
 *     summary: Actualiza una licencia existente
 *     description: Actualiza los datos de una licencia existente en el sistema.
 *     tags: [Licencias]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la licencia a actualizar
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
 *                 description: ID del empleado asociado a la licencia
 *                 example: 1
 *               Tipo:
 *                 type: string
 *                 description: Tipo de licencia
 *                 example: Maternidad
 *               FechaInicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la licencia
 *                 example: 2023-09-01
 *               FechaFin:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin de la licencia
 *                 example: 2023-09-30
 *               Comentarios:
 *                 type: string
 *                 description: Comentarios adicionales sobre la licencia
 *                 example: Licencia por maternidad
 *     responses:
 *       200:
 *         description: Licencia actualizada exitosamente
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       404:
 *         description: Licencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', [validarJWT], putLicencias)

/**
 * @swagger
 * /api/licencias/{id}:
 *   delete:
 *     summary: Elimina una licencia
 *     description: Elimina una licencia del sistema por su ID.
 *     tags: [Licencias]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la licencia a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Licencia eliminada exitosamente
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       404:
 *         description: Licencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', [validarJWT], deleteLicencias)



module.exports = router;