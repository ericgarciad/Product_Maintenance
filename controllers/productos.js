const { response, request } = require('express');
const { body } = require('express-validator');
const Productos = require('../models/producto');

var express=require("express");
var bodyParser=require("body-parser");

var app=express();

/*
const obtenerProductos = async(req, res = response ) => {

   res.send( Productos.find({}));
    
}
*/
const obtenerProductos = async (req, res) => {

    Productos.find({}, function (err, movies) {
        res.render('index.ejs', {
            moviesList: movies
        })
    })
}

const addProduct = async (req, res) => {

    const productoDB = await Productos.findOne({ name: req.body.name });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${req.body.name} ya existe`
        });
    }

    const data = {
        ...body,
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        available: req.body.available
    }

    const products = new Productos(data)
    console.log("tmp " + products)

    //Guardar DB
    await products.save();

    res.redirect('https://productmaintenance-nodeegd.herokuapp.com/')
};


const deleteProduct = async (req, res) => {

    const { id } = req.params;
    //res.json( id );
    // res.json( req.body );
    const productoBorrado = await Productos.findByIdAndDelete(id);
    // res.json( productoBorrado );
    //res.redirect('http://localhost:8081/')

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
            movie: req.params
        })

        
    //res.redirect('http://localhost:8081/home')


    //res.redirect('http://localhost:8081/home')
    res.redirect('https://productmaintenance-nodeegd.herokuapp.com/')

};

const updateProduct = async (req, res) => {

    const { id } = req.params;

    console.log(id)

    const productoDB = await Productos.findOne({ name: req.body.name });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${req.body.name} ya existe`
        });
    }

    const data = {
        
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        available: req.body.available
    }

    const producto = await Productos.findByIdAndUpdate(id, data, { new: true });

    //res.json( producto );
    

    //res.redirect('https://productmaintenance-nodeegd.herokuapp.com/')
    res.redirect('http://localhost:8081/')
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