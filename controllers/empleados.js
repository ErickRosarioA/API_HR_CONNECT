const { config } = require("../Database/dbconfig");
const sql = require('mssql');

// Obtener todos los empleado
const getEmpleados = async (req,res) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM Empleados');
      res.send(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
  // Obtener un empleado por su ID
 const getbyID = async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Empleados WHERE id = @id');
      if (result.recordset.length === 0) {
        res.status(404).send('Empleado no encontrado');
      } else {
        res.send(result.recordset[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
//   // Agregar un nuevo empleado
  const postEmpleados = async (req, res) => {
    const {Nombre,Departamento,FechaContratacion,Direccion,Telefono,Celular,Salario} = req.body;
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`INSERT INTO Empleados (Nombre,Departamento,FechaContratacion,Direccion,Telefono,Celular,Salario) VALUES ('${Nombre}', '${Departamento}', '${FechaContratacion}', '${Direccion}', '${Telefono}', '${Celular}', '${Salario}')`);
      res.send('Empleado agregado');
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
//   // Actualizar un empleado existente
  const putEmpleados = async (req, res) => {
    const { id } = req.params;
    const {Nombre,Departamento,FechaContratacion,Direccion,Telefono,Celular,Salario} = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('ID', sql.Int, id)
        .input('Nombre', sql.NVarChar(100), Nombre)
        .input('Departamento', sql.NVarChar(50), Departamento)
        .input('FechaContratacion', sql.DateTime, FechaContratacion)
        .input('Direccion', sql.NVarChar(100), Direccion)
        .input('Telefono', sql.NVarChar(100), Telefono)
        .input('Celular', sql.NVarChar(100), Celular)
        .input('Salario', sql.Decimal(10,2), Salario)
        .query(
          `UPDATE Empleados SET Nombre = '${Nombre}', Departamento = '${Departamento}', FechaContratacion = '${FechaContratacion}', Direccion = '${Direccion}', Telefono = '${Telefono}', Celular = '${Celular}', Salario = '${Salario}' WHERE id = @id`);
      if (result.rowsAffected[0] === 0) {
        res.status(404).send('empleado no encontrado');
      } else {
        res.send('Empleado actualizado');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
//   // Eliminar un empleado
  const deleteEmpleados = async (req, res) => {
    const id = req.params.id;
    try {
      const pool = await sql.connect(config);
       const result = await pool.request()
          .query(`DELETE FROM Empleados WHERE id = ${id}`);
          if (result.rowsAffected[0]) {
            res.send(`empleado con ID ${id} eliminado correctamente.`);
          }else{
            res.status(404).send(`No se encontró el Empleado con ID ${id}.`);
          }
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al eliminar el Empleado con ID ${id}.`);
    }
  };

  module.exports = {getEmpleados,getbyID,postEmpleados,putEmpleados,deleteEmpleados}