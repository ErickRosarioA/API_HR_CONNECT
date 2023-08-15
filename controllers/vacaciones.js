const { config } = require("../Database/dbconfig");
const sql = require('mssql');

// Obtener todas las vacaciones
const getVacaciones = async (req,res) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT v.EmpleadoID,e.Nombre,v.FechaInicio,v.FechaFin,v.Aprobada FROM Vacaciones v INNER JOIN Empleados e on v.EmpleadoID = e.ID ');
      if (result.recordset.length === 0) {
        res.status(404).send('No se ha encontrado registros de vacaciones');
      } else {
        res.send(result.recordset);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
  // Obtener las vacaciones por su ID
 const getbyVacacionesID = async (req, res) => {
    const { id } = req.params;
    // console.log(req.params)
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT v.EmpleadoID,e.Nombre,v.FechaInicio,v.FechaFin,v.Aprobada FROM Vacaciones v INNER JOIN Empleados e on v.EmpleadoID = e.ID  WHERE v.id = @id');
      if (result.recordset.length === 0) {
        res.status(404).send('Vacaciones no encontrada');
      } else {
        res.send(result.recordset[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  // Agregar unas nuevas vacaciones
  const postVacaciones = async (req, res) => {
    const {EmpleadoID,FechaInicio,FechaFin,Aprobada} = req.body;
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`INSERT INTO Vacaciones (EmpleadoID,FechaInicio,FechaFin,Aprobada) VALUES ('${EmpleadoID}', '${FechaInicio}','${FechaFin}','${Aprobada}')`);
      res.send('vacaciones agregada');
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
// Actualizar unas vacaciones existente
  const putVacaciones = async (req, res) => {
    const { id } = req.params;
    const {EmpleadoID,FechaInicio,FechaFin,Aprobada} = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('ID', sql.Int, id)
        .input('EmpleadoID', sql.Int, EmpleadoID)
        .input('FechaInicio', sql.DateTime, FechaInicio)
        .input('FechaFin', sql.DateTime, FechaFin)
        .input('Aprobada', sql.Bit, Aprobada)
        .query(
          `UPDATE Vacaciones SET   EmpleadoID = ${EmpleadoID},FechaInicio = '${FechaInicio}', FechaFin = '${FechaFin}', Aprobada = '${Aprobada}' WHERE id = @id`);
      if (result.rowsAffected[0] === 0) {
        res.status(404).send('Vacaciones no encontrada');
      } else {
        res.send('Vacaciones actualizada');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
//   // Eliminar unas vacaciones
  const deleteVacaciones = async (req, res) => {
    const id = req.params.id;
    try {
      const pool = await sql.connect(config);
       const result = await pool.request()
          .query(`DELETE FROM Vacaciones WHERE id = ${id}`);
          if (result.rowsAffected[0]) {
            res.send(`vacaciones con ID ${id} eliminada correctamente.`);
          }else{
            res.status(404).send(`No se encontró la vacaciones con ID ${id}.`);
          }
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al eliminar la vacaciones con ID ${id}.`);
    }
  };

  module.exports = {getVacaciones,getbyVacacionesID,postVacaciones,putVacaciones,deleteVacaciones}