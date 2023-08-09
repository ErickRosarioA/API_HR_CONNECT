const { response, request } = require('express');
const jwt = require('jsonwebtoken');

// Validacion del token
const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}