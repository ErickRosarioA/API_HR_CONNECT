const { config } = require("../Database/dbconfig");
const sql = require('mssql');

// Obtener todos los Tipo de documentos
const getTipoDocumento = async (req,res) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM TiposDocumentos');
      res.send(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
  // Obtener tipos de documentos por su ID
 const getbyTipoDocumentoID = async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM TiposDocumentos WHERE id = @id');
      if (result.recordset.length === 0) {
        res.status(404).send('Tipo de documento no encontrado');
      } else {
        res.send(result.recordset[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  module.exports = {getTipoDocumento,getbyTipoDocumentoID}