const config = {
    user: 'cesar',
    password: 'Ce123456',
    server: 'localhost',
    database: 'ApiHRConnect',
    options:{
        trustedconnection: true,
        enableArithAbort: true,
        instancename : 'SQLEXPRESS',
        trustServerCertificate: true,
    },
  };

module.exports = {config}