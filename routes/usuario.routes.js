const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, getbyUsuariosID } = require("../controllers/usuarios");

const router = Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID del usuario
 *           example: 1
 *         NombreUsuario:
 *           type: string
 *           description: Nombre de usuario
 *           example: usuario123
 *         RolID:
 *           type: integer
 *           description: ID del rol del usuario
 *           example: 2
 *         Descripcion:
 *           type: string
 *           description: Descripción del rol
 *           example: Administrador
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene la lista de usuarios
 *     description: Obtiene la lista de usuarios registrados con sus detalles.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: No se encontraron registros de usuarios
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 */
router.get('/', [validarJWT], getUsuarios)


/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     description: Obtiene los detalles de un usuario según su ID.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del usuario obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', [validarJWT], getbyUsuariosID)

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Agrega un nuevo usuario
 *     description: Agrega un nuevo usuario al sistema.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreUsuario:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: usuario123
 *               Clave:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: contraseña123
 *               RolID:
 *                 type: integer
 *                 description: ID del rol del usuario
 *                 example: 2
 *     responses:
 *       200:
 *         description: Usuario agregado exitosamente
 *       400:
 *         description: El usuario ya existe
 *       500:
 *         description: Error en el servidor
 */
router.post('/', [validarJWT], postUsuarios)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     description: Actualiza los datos de un usuario existente en el sistema.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
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
 *               NombreUsuario:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: usuario123
 *               Clave:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: contraseña123
 *               RolID:
 *                 type: integer
 *                 description: ID del rol del usuario
 *                 example: 2
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', [validarJWT], putUsuarios)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario existente
 *     description: Elimina un usuario existente del sistema.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', [validarJWT], deleteUsuarios)



module.exports = router;