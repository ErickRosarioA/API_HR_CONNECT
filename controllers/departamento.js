const { config } = require("../Database/dbconfig");
const sql = require('mssql');

// Obtener todos los Departamentos
const getDepartamento = async (req,res) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM Departamentos');
      res.send(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
  // Obtener un departamento por su ID
 const getbyDepartamentoID = async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Departamentos WHERE id = @id');
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
  //Agregar un nuevo departamento
  const postDepartamentos = async (req, res) => {
    const {Descripcion} = req.body;
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`INSERT INTO Departamentos (Descripcion) VALUES ('${Descripcion}')`);
      res.send('Departamento agregado');
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  module.exports = {getDepartamento,getbyDepartamentoID,postDepartamentos}