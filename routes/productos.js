const { Router } = require('express');


const {
    getProducts,
    addProduct,
    deleteProduct,
    getInfoByUpdateProduct,
    updateProduct,
   
} = require('../controllers/productos');

const router = Router();

//  Get Products
router.get('/', getProducts);
//  Add Products
router.post('/add', addProduct);
//  Delete Products
router.post('/delete/:id', deleteProduct);
//  Show info update Products
router.post('/getupdate/:id/:name/:brand/:category/:price/:available', getInfoByUpdateProduct);
//  Update Products
router.post('/update/:id', updateProduct);
module.exports = router;