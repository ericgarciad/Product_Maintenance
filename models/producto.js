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

ProductoSchema.methods.toJSON = function(){ //usamos una función norma len vez de flecha porque la normal mantiene el this dentro y la flecha fuera y ahora lo necesitamos
    // quitamos __v de la respuesta del json de esta manera
    const { __v, estado, ...data} = this.toObject(); // genera una instancia con los valores respectivos nombre correo etc..
    return data;
    //todo el resto de argumentos los voy a usar con el operador rest "..." ...usuario
} //voy a sobreescribir el método toJSON para que no devuelva la version (__v) y el estado en el JSON informatvo de la categoria

const Productos = model( 'Producto', ProductoSchema );
module.exports =  Productos;
