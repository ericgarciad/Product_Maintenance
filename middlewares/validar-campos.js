//Validar Campos como correo, nombre, password, rol etc - paquete de terceros
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => { // next es para los middlewares, se llama si el middleware pasa. 

    //Controlamos la validación del correo desde usuario.js/routes con el check de require('express-validator');
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next(); // si llega hasta aqui, significa que siga hasta el siguiente middleware
}

module.exports = {
    validarCampos
}