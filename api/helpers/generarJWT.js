const jwt = require('jsonwebtoken');

// Creacion del token
const generarJWT = ( uid = '' ) => {
    
    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1800s'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            } else{
                resolve(token);
            }
        })
    })
}


module.exports = {
    generarJWT
}