const { config } = require("../Database/dbconfig");
const sql = require('mssql');

// Obtener todas las licencias
const getLicencia = async (req,res) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT l.EmpleadoID,e.Nombre,l.Tipo,l.FechaInicio,l.FechaFin,l.Comentarios FROM Licencias l INNER JOIN Empleados e on l.EmpleadoID = e.ID');
      if (result.recordset.length === 0) {
        res.status(404).send('No se ha encontrado registros de licencias');
      } else {
        res.send(result.recordset);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
  // Obtener una licencia por su ID
 const getbyLicenciaID = async (req, res) => {
    const { id } = req.params;
    // console.log(req.params)
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT l.EmpleadoID,e.Nombre,l.Tipo,l.FechaInicio,l.FechaFin,l.Comentarios FROM Licencias l INNER JOIN Empleados e on l.EmpleadoID = e.ID where l.id = @id');
      if (result.recordset.length === 0) {
        res.status(404).send('Licencia no encontrada');
      } else {
        res.send(result.recordset[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
   // Agregar un nueva licencia
   const postLicencias = async (req, res) => {
    const {EmpleadoID,Tipo,FechaInicio,FechaFin,Comentarios} = req.body;
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`INSERT INTO Licencias (EmpleadoID,Tipo,FechaInicio,FechaFin,Comentarios) VALUES ('${EmpleadoID}', '${Tipo}', '${FechaInicio}','${FechaFin}','${Comentarios}')`);
      res.send('Licencia agregada');
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
// Actualizar una licencia existente
  const putLicencias = async (req, res) => {
    const { id } = req.params;
    const {EmpleadoID,Tipo,FechaInicio,FechaFin,Comentarios} = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('ID', sql.Int, id)
        .input('EmpleadoID', sql.Int, EmpleadoID)
        .input('Tipo', sql.NVarChar(50), Tipo)
        .input('FechaInicio', sql.DateTime, FechaInicio)
        .input('FechaFin', sql.DateTime, FechaFin)
        .input('Comentarios', sql.NVarChar(100), Comentarios)
        .query(
          `UPDATE Licencias SET   EmpleadoID = ${EmpleadoID}, Tipo = '${Tipo}',FechaInicio = '${FechaInicio}', FechaFin = '${FechaFin}', Comentarios = '${Comentarios}' WHERE id = @id`);
      if (result.rowsAffected[0] === 0) {
        res.status(404).send('Licencias no encontrada');
      } else {
        res.send('Licencias actualizada');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
//   // Eliminar una licencia
  const deleteLicencias = async (req, res) => {
    const id = req.params.id;
    try {
      const pool = await sql.connect(config);
       const result = await pool.request()
          .query(`DELETE FROM Licencias WHERE id = ${id}`);
          if (result.rowsAffected[0]) {
            res.send(`licencia con ID ${id} eliminada correctamente.`);
          }else{
            res.status(404).send(`No se encontró la Licencia con ID ${id}.`);
          }
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al eliminar la Licencia con ID ${id}.`);
    }
  };

  module.exports = {getLicencia,getbyLicenciaID,postLicencias,putLicencias,deleteLicencias}