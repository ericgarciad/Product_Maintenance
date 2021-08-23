const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        await mongoose.connect( process.env.MONGODB_CONEXION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } );

        console.log('Data Base MongoDB online');

    }catch (error) {
        console.log(error);
        throw new Error('Error to start Data Base');
    }
}

module.exports = {
    dbConnection
}