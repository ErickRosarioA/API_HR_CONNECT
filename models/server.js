const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

//Swagger 
const swaggerUI = require("swagger-ui-express");
const swaggerjsDoc = require("swagger-jsdoc");
const path = require("path");
const swaggerSpecifications = {
  definition :{
    openapi:"3.1.1",
    info:{
      title:"Api HR Connect Documentation",
      version:"1.0.0"
    },
    servers:[
      {
        url:"http://localhost:4443"
      }
    ]

  },
  apis:[`${path.join(__dirname, "./routes/*.js")}`]
}


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = {
      empleados: "/api/empleados",
      departamentos: "/api/departamentos",
      tipodocumento: "/api/tipodocumento",
      vacaciones: "/api/vacaciones",
      licencias: "/api/licencias",
      usuarios: "/api/usuarios",
      roles: "/api/roles",
      auth: "/api/auth",
    };


    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo
    // Trata de parsear los datos que vengan en el request
    this.app.use(express.json());

    //Swagger use
    this.app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(swaggerjsDoc(swaggerSpecifications)))

    // Directorio publico
    this.app.use(express.static("public"));

  }

  routes() {
    this.app.use(this.path.empleados, require("../routes/empleado.routes"));
    this.app.use(this.path.departamentos, require("../routes/departamento.routes"));
    this.app.use(this.path.tipodocumento, require("../routes/tipodocumento.routes"));
    this.app.use(this.path.vacaciones, require("../routes/vacaciones.routes"));
    this.app.use(this.path.licencias, require("../routes/licencia.routes"));
    this.app.use(this.path.usuarios, require("../routes/usuario.routes"));
    this.app.use(this.path.roles, require("../routes/rol.routes"));
    this.app.use(this.path.auth, require("../routes/login.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando en el puerto", this.port);
    });
  }
}

module.exports = Server;
