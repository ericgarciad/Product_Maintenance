const { response, request } = require('express');
const { body } = require('express-validator');
const Productos = require('../models/producto');

var express=require("express");
var bodyParser=require("body-parser");

var app=express();

const cloudinary = require('cloudinary').v2 // paquete de terceros para subir imagenes a u nservidor de imagenes
cloudinary.config(process.env.CLOUDINARY_URL);


const fs = require("fs");


/*
const obtenerProductos = async(req, res = response ) => {

   res.send( Productos.find({}));
    
}
*/
const obtenerProductos = async (req, res) => {

    Productos.find({}, function (err, products) {
        res.render('index.ejs', {
            productList: products
        })
    })
}


const addProduct = async (req, res) => {



    if ((!req.body.name || !req.body.brand || !req.body.category || !req.body.price || !req.body.available) ){
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


    //Guardar DB
    await products.save();

    res.redirect('https://productmaintenance-nodeegd.herokuapp.com/')
    //res.redirect('http://localhost:8081')
};


const deleteProduct = async (req, res) => {

    const { id } = req.params;
    //res.json( id );
    // res.json( req.body );
    const productoBorrado = await Productos.findByIdAndDelete(id);
    // res.json( productoBorrado );
    res.redirect('https://productmaintenance-nodeegd.herokuapp.com/')


    //res.redirect('http://localhost:8081/home')
};

const getInfoByUpdateProduct = async (req = request, res) => {

    

    const { id, name, brand, category, price, available } = req.params;
    const bodyR = req.query.imageID;
    //res.json( id );
    //res.json( req.body );
    //res.json( req.params );
    
        res.render('updateProduct.ejs', {
            product: req.params
        })

        
    //res.redirect('http://localhost:8081/home')


    //res.redirect('http://localhost:8081/home')
};

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

    //const producto = await Productos.findByIdAndUpdate(id, data, { new: true });
    //res.json( producto );

     await Productos.findByIdAndUpdate(id, data, { new: true });

    

    res.redirect('https://productmaintenance-nodeegd.herokuapp.com/')
    //res.redirect('http://localhost:8081/')
};


module.exports = {
    //crearProducto,
    obtenerProductos,
    addProduct,
    deleteProduct,
    getInfoByUpdateProduct,
    updateProduct,
    // obtenerProducto,
    // actualizarProducto,
    // borrarProducto
}