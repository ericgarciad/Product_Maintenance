const express = require('express') // Paquete de Terceros
const cors = require('cors'); // Paquete de Terceros
const fileUpload = require('express-fileupload'); // Paquete de Terceros
const path = require('path');
const { dbConnection } = require('../database/config');




class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT

        //Declare paths of routes in object
        this.paths = {
            productos: '/',
        }

        // Connect to DB
        this.conectarDB();

        // Middlewares (Always execute when the server on)
        this.middlewares();

        // Routes app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS - Protect server
        this.app.use(cors());

        // Parse and read body
        this.app.use(express.json());

        // Public path
        this.app.use(express.static('public'));
        this.app.use('/uploads', express.static('uploads'));

        // EJS Path (views/html.ejs)
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views'));

        // Get input values FORM HTML POST
        // Parse URL-encoded bodies (as sent by HTML forms)
        this.app.use(express.urlencoded());
    }

    routes() {

        this.app.use(this.paths.productos, require('../routes/productos'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server started in port', this.port)
        });
    }
}

module.exports = Server;