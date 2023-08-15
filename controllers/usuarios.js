const { config } = require("../Database/dbconfig");
const bcryptjs = require("bcryptjs")
const sql = require('mssql');

// Obtener todas los usuarios
const getUsuarios = async (req,res) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT u.ID, u.NombreUsuario, u.RolID, r.Descripcion FROM Usuarios u INNER JOIN Roles r on RolID = r.ID');
      if (result.recordset.length === 0) {
        res.status(404).send('No se ha encontrado registros de usuarios');
      } else {
        res.send(result.recordset);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
  // Obtener los usuarios por su ID
 const getbyUsuariosID = async (req, res) => {
    const { id } = req.params;
    // console.log(req.params)
    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT  u.ID, u.NombreUsuario, u.RolID, r.Descripcion FROM Usuarios u INNER JOIN Roles r on RolID = r.ID WHERE u.id = @id');
      if (result.recordset.length === 0) {
        res.status(404).send('Usuarios no encontrada');
      } else {
        res.send(result.recordset[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  // Agregar un nuevo usuario
  const postUsuarios = async (req, res) => {
    const {NombreUsuario,Clave,RolID} = req.body;
    try {
      const pool = await sql.connect(config);
      // Validar si existe usuario
      const users = await pool.request().query(`SELECT * FROM Usuarios where NombreUsuario = '${NombreUsuario}'`);

      if(users.recordset.length !== 0){
        return res.status(400).json({msg:"El usuario ya existe"})
      }

      // Encriptar password
      const encrypt = bcryptjs.genSaltSync();
      const passEncrypted = bcryptjs.hashSync(Clave, encrypt);

      await pool.request().query(`INSERT INTO Usuarios (NombreUsuario,Clave,RolID) VALUES ('${NombreUsuario}', '${passEncrypted}','${RolID}')`);
      res.send('usuarios agregada');
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
// Actualizar un usuario existente
  const putUsuarios = async (req, res) => {
    const { id } = req.params;
    const {NombreUsuario,Clave,RolID} = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('ID', sql.Int, id)
        .input('NombreUsuario', sql.NVarChar(50), NombreUsuario)
        .input('Clave', sql.NVarChar(20), Clave)
        .input('RolID', sql.Int, RolID)
        .query(
          `UPDATE Usuarios SET NombreUsuario = '${NombreUsuario}', Clave = '${Clave}', RolID = ${RolID} WHERE id = @id`);
      if (result.rowsAffected[0] === 0) {
        res.status(404).send('Usuarios no encontrado');
      } else {
        res.send('Usuarios actualizado');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
//   // Eliminar un usuario
  const deleteUsuarios = async (req, res) => {
    const id = req.params.id;
    try {
      const pool = await sql.connect(config);
       const result = await pool.request()
          .query(`DELETE FROM Usuarios WHERE id = ${id}`);
          if (result.rowsAffected[0]) {
            res.send(`usuarios con ID ${id} eliminada correctamente.`);
          }else{
            res.status(404).send(`No se encontró el usuarios con ID ${id}.`);
          }
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al eliminar el usuarios con ID ${id}.`);
    }
  };

  module.exports = {getUsuarios,getbyUsuariosID,postUsuarios,putUsuarios,deleteUsuarios}