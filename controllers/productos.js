const { response, request } = require('express');
const { body } = require('express-validator');
const Productos = require('../models/producto');

//Get products
const getProducts = async (req, res) => {

    Productos.find({}, function (err, products) {
        res.render('index.ejs', {
            productList: products
        })
    })
}

//Add Products
const addProduct = async (req, res) => {

    if ((!req.body.name || !req.body.brand || !req.body.category || !req.body.price || !req.body.available)) {
        return res.status(400).json({
            Error_message: `You have to complete all the fields to add a new product `
        });
    }

    if (req.body.price < 0) {
        return res.status(400).json({
            Error_message: `The price can only be 0 or greater than 0. Please, check the price: ${req.body.price}`
        });
    }

    const data = {
        ...body,
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        available: req.body.available,
        img: req.body.img
    }

    const products = new Productos(data)
    console.log("tmp " + products)


    //Save in DB
    await products.save();

    res.redirect('https://productmaintenance-nodeegd.herokuapp.com/')
    //res.redirect('http://localhost:8081')
};

// Delete products
const deleteProduct = async (req, res) => {

    const { id } = req.params;
    //res.json( id );
    // res.json( req.body );
    const productoBorrado = await Productos.findByIdAndDelete(id);
    // res.json( productoBorrado );
    res.redirect('https://productmaintenance-nodeegd.herokuapp.com/')


    //res.redirect('http://localhost:8081/home')
};

//Get info before update
const getInfoByUpdateProduct = async (req = request, res) => {


    const { id, name, brand, category, price, available } = req.params;
    const bodyR = req.query.imageID;
    //res.json( id );
    //res.json( req.body );
    //res.json( req.params );

    res.render('updateProduct.ejs', {
        product: req.params
    })

};

//Update product
const updateProduct = async (req, res) => {

    const { id } = req.params;

    console.log(id)

    const productoDB = await Productos.findOne({ name: req.body.name });

    if (req.body.price < 0) {
        return res.status(400).json({
            Error_message: `The price can only be 0 or greater than 0. Please, check the price: ${req.body.price}`
        });
    }

    const data = {

        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        available: req.body.available
    }

    await Productos.findByIdAndUpdate(id, data, { new: true });

    res.redirect('https://productmaintenance-nodeegd.herokuapp.com/')
    //res.redirect('http://localhost:8081/')
};


module.exports = {
    getProducts,
    addProduct,
    deleteProduct,
    getInfoByUpdateProduct,
    updateProduct,
}