# API_HR_CONNECT
Este proyecto es un API que funcionará como una plataforma de gestión de recursos humanos. Permitirá a los usuarios autenticados, 
tanto Administradores como Empleados, llevar a cabo diversas operaciones relacionadas con la información de los empleados, 
las solicitudes de vacaciones y licencias, y la gestión de documentos.
Tecnologías a utilizar:
1. Backend: El backend del sistema será desarrollado utilizando Node.js y Express.js. Estas tecnologías
permiten crear de manera eficiente y rápida APIs robustas y escalables.
2. Base de datos: Se utilizará una base de datos relacional, como MySQL o PostgreSQL, para almacenar la
información de los empleados, las solicitudes y otros datos relevantes del sistema. Se puede utilizar una biblioteca ORM como Sequelize para interactuar con la base de datos.
3. Autenticación: Para la autenticación de usuarios, se implementará la tecnología JSON Web Tokens (JWT). Al enviar las credenciales de inicio de sesión, el servidor generará un token JWT que será utilizado para autenticar las solicitudes posteriores.
4. Almacenamiento de archivos: Para el almacenamiento de archivos, como los CV en formato PDF o Word, se puede
utilizar un servicio en la nube como AWS S3 o Google Cloud Storage. Estos servicios ofrecen almacenamiento seguro y permiten acceder a los archivos cuando sea necesario.
5. Documentación: Se utilizará Swagger para la documentación de la API.
Swagger proporciona una interfaz interactiva y fácil de usar que permite a los usuarios explorar y probar los diferentes endpoints de la API.
