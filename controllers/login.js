const { config } = require("../Database/dbconfig");
const sql = require('mssql');
const bcryptjs = require("bcryptjs")
const { generarJWT } = require("../helpers/generarJWT");
const { v4: uuidv4 } = require('uuid');

  
//Logeo para usuario del sistema
  const Login = async (req, res) => {
    const {usuario, clave} = req.body;
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query(`SELECT * FROM Usuarios where NombreUsuario = '${usuario}'`);

      const user = result.recordset[0].NombreUsuario
      const pass = result.recordset[0].Clave
      const rol = result.recordset[0].RolID

      if(!user){
        return res.status(400).json({msg:"Usuario incorrecta"})
      }

      const validarClave = bcryptjs.compareSync(clave, pass);
      if(!validarClave){
        return res.status(400).json({msg:"Clave incorrecta"})
      }

      const uid = uuidv4();
      const token = await generarJWT(uid);

      res.json({user, rol, token})

    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  module.exports = {Login}