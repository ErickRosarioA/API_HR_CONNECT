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
      generateToken: "/api/token",
      empleados: "/api/empleados"
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
    this.app.use("/api-doc",swaggerUI.serve, swaggerUI.setup(swaggerjsDoc(swaggerSpecifications)))

    // Directorio publico
    this.app.use(express.static("public"));

  }

  routes() {
    this.app.use(this.path.generateToken, require("../routes/token.routes"));
    this.app.use(this.path.empleados, require("../routes/empleado.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando en el puerto", this.port);
    });
  }
}

module.exports = Server;
