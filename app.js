const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const config = require('./models/sever');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

sql.connect(config, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});