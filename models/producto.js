const { Schema, model, SchemaTypes } = require('mongoose');

const ProductoSchema = Schema({
    name: {
        type: String, 
        required: true
    },
    price: {
        type: SchemaTypes.Decimal128,
        required: true,
        default: 0
    },
    category: {
        type: String,
        ref: 'Categoria',
        required: false
    },
    brand: {
        type: String,
    },
    available: {
        type: String,
        default: 'Active'
    },
    img: {
        type: String
    }
});

ProductoSchema.methods.toJSON = function(){ 
    const { __v, estado, ...data} = this.toObject(); 
    return data;
} 

const Productos = model( 'Producto', ProductoSchema );
module.exports =  Productos;
