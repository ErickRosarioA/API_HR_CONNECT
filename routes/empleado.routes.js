const { Router } = require("express");
const { getEmpleados, getbyID, postEmpleados, putEmpleados, deleteEmpleados } = require("../controllers/empleados");
const { validarJWT } = require("../middlewares/validarJWT");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       properties:
 *         DepartamentoID:
 *           type: integer
 *           description: ID del departamento del empleado
 *           example: 1
 *         Descripcion:
 *           type: string
 *           description: Descripción del departamento del empleado
 *           example: Departamento de Ventas
 *         TipoDocumentoID:
 *           type: integer
 *           description: ID del tipo de documento del empleado
 *           example: 1
 *         TipoDocumento:
 *           type: string
 *           description: Tipo de documento del empleado
 *           example: Cédula de Identidad
 *         Nombre:
 *           type: string
 *           description: Nombre del empleado
 *           example: Juan Pérez
 *         Cedula:
 *           type: string
 *           description: Número de cédula del empleado
 *           example: 1234567890
 *         FechaContratacion:
 *           type: string
 *           format: date
 *           description: Fecha de contratación del empleado
 *           example: 2023-08-15
 *         Direccion:
 *           type: string
 *           description: Dirección del empleado
 *           example: Calle 123, Ciudad
 *         Telefono:
 *           type: string
 *           description: Número de teléfono del empleado
 *           example: 123-4567890
 *         Celular:
 *           type: string
 *           description: Número de celular del empleado
 *           example: 987-6543210
 *         Salario:
 *           type: number
 *           description: Salario del empleado
 *           example: 2500.00
 *         Rutadocumento:
 *           type: string
 *           description: Ruta del documento del empleado
 *           example: ruta/al/documento.pdf
 */

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtiene la lista de empleados
 *     description: Obtiene la lista de empleados registrados con sus detalles.
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       500:
 *         description: Error en el servidor
 */
router.get('/', [validarJWT], getEmpleados)

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     summary: Obtiene los detalles de un empleado por su ID
 *     description: Obtiene los detalles de un empleado registrado en el sistema según su ID.
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado a obtener detalles
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del empleado obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', [validarJWT], getbyID)

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Agrega un nuevo empleado
 *     description: Agrega un nuevo empleado al sistema.
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DepartamentoID:
 *                 type: integer
 *                 description: ID del departamento del empleado
 *                 example: 1
 *               TipoDocumentoID:
 *                 type: integer
 *                 description: ID del tipo de documento del empleado
 *                 example: 1
 *               Nombre:
 *                 type: string
 *                 description: Nombre del empleado
 *                 example: Juan Pérez
 *               Cedula:
 *                 type: string
 *                 description: Número de cédula del empleado
 *                 example: 1234567890
 *               FechaContratacion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de contratación del empleado
 *                 example: 2023-08-15
 *               Direccion:
 *                 type: string
 *                 description: Dirección del empleado
 *                 example: Calle 123, Ciudad
 *               Telefono:
 *                 type: string
 *                 description: Número de teléfono del empleado
 *                 example: 123-4567890
 *               Celular:
 *                 type: string
 *                 description: Número de celular del empleado
 *                 example: 987-6543210
 *               Salario:
 *                 type: number
 *                 description: Salario del empleado
 *                 example: 2500.00
 *               Rutadocumento:
 *                 type: string
 *                 description: Ruta del documento del empleado
 *                 example: ruta/al/documento.pdf
 *     responses:
 *       200:
 *         description: Empleado agregado exitosamente
 *       400:
 *         description: El empleado ya existe
 *       500:
 *         description: Error en el servidor
 */
router.post('/', [validarJWT], postEmpleados)

/**
 * @swagger
 * /api/empleados/{id}:
 *   put:
 *     summary: Actualiza un empleado existente
 *     description: Actualiza los datos de un empleado existente en el sistema.
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado a actualizar
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
 *               DepartamentoID:
 *                 type: integer
 *                 description: ID del departamento del empleado
 *                 example: 2
 *               TipoDocumentoID:
 *                 type: integer
 *                 description: ID del tipo de documento del empleado
 *                 example: 1
 *               Nombre:
 *                 type: string
 *                 description: Nombre del empleado
 *                 example: María López
 *               Cedula:
 *                 type: string
 *                 description: Número de cédula del empleado
 *                 example: 1234567890
 *               FechaContratacion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de contratación del empleado
 *                 example: 2023-08-20
 *               Direccion:
 *                 type: string
 *                 description: Dirección del empleado
 *                 example: Avenida 456, Ciudad
 *               Telefono:
 *                 type: string
 *                 description: Número de teléfono del empleado
 *                 example: 987-6543210
 *               Celular:
 *                 type: string
 *                 description: Número de celular del empleado
 *                 example: 123-4567890
 *               Salario:
 *                 type: number
 *                 description: Salario del empleado
 *                 example: 2800.00
 *               Rutadocumento:
 *                 type: string
 *                 description: Ruta del documento del empleado
 *                 example: ruta/nuevo-documento.pdf
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', [validarJWT], putEmpleados)

/**
 * @swagger
 * /api/empleados/{id}:
 *   delete:
 *     summary: Elimina un empleado
 *     description: Elimina un empleado del sistema según su ID.
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *       401:
 *         description: Acceso no autorizado, token inválido o expirado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', [validarJWT], deleteEmpleados)




module.exports = router;