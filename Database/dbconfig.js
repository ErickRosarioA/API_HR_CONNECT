const config = {
    user: 'localhost',
    password: 'Erick1234',
    server: '\\ERICKSERVER',
    database: 'ApiHRConnect',
    options:{
        trustedconnection: true,
        enableArithAbort: true,
        instancename : 'MSSQL',
        trustServerCertificate: true,
    },
  };

module.exports = {config}