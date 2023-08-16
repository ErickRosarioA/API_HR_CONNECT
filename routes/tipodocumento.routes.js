const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getTipoDocumento, getbyTipoDocumentoID } = require("../controllers/tipodocumento");

const router = Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     TipoDocumento:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID del tipo de documento
 *           example: 1
 *         TipoDocumento:
 *           type: string
 *           description: Tipo de documento
 *           example: Cédula de Identidad
 */

/**
 * @swagger
 * /api/tipodocumento:
 *   get:
 *     summary: Obtiene la lista de tipos de documentos
 *     description: Obtiene la lista de tipos de documentos registrados en el sistema.
 *     tags: [TipoDocumento]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de documentos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoDocumento'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       500:
 *         description: Error en el servidor
 */
router.get('/', [validarJWT], getTipoDocumento)

// router.post('/', [validarJWT], postDepartamentos)


/**
 * @swagger
 * /api/tipodocumento/{id}:
 *   get:
 *     summary: Obtiene un tipo de documento por su ID
 *     description: Obtiene los detalles de un tipo de documento registrado en el sistema por su ID.
 *     tags: [TipoDocumento]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de documento a obtener
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tipo de documento obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoDocumento'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       404:
 *         description: Tipo de documento no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', [validarJWT], getbyTipoDocumentoID)


module.exports = router;