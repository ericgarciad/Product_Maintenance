//De esta forma, con solo 1 linea podemos exportar todos los middlewares a usuarios.js routes

const validaCampos = require('../middlewares/validar-campos');

const validarArchivoSubir = require('../middlewares/validar-archivo');

module.exports = {
    ...validaCampos,
    ...validarArchivoSubir
}