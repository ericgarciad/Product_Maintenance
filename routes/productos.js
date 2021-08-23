const { Router } = require('express');
const { check } = require('express-validator');
const fileUpload = require('multer')

const { validarCampos } = require('../middlewares');

const {// crearProducto,
    obtenerProductos,
    addProduct,
    deleteProduct,
    getInfoByUpdateProduct,
    updateProduct,
    //obtenerProducto,
   // actualizarProducto,
    //borrarProducto 
} = require('../controllers/productos');

const router = Router();

//  Obtener todas las productos - publico
router.get('/', obtenerProductos);
router.post('/add', addProduct);
router.post('/delete/:id', deleteProduct);
router.post('/getupdate/:id/:name/:brand/:category/:price/:available', getInfoByUpdateProduct);
router.post('/update/:id', updateProduct);
module.exports = router;