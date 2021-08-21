const { response } = require("express");


const validarArchivoSubir = (req, res = response, next) => {

    //Preguntamos si en la request viene un archivo, es decir si files tiene algo o no hay ningu narchivo subido
    //En Object.keys mira si por lo menos viene una propiedad de files ahi o no
    // Ponemos tambien !req.files.archivo porque queremos controlar si viene o no un archivo con el nombre "archivo" que es el que me hemos dado nosotros al subirlo
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivos que subir. - validarArchivoSubir'
        });
    }
    //Si todo esto pasa he de llamar a la función next() para que siga comprobando otros middleware, si hay
    next();
}

module.exports = {
    validarArchivoSubir
}