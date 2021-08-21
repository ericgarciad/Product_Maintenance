const express = require('express') // Paquete de Terceros
const cors = require('cors'); // Paquete de Terceros
const fileUpload = require('express-fileupload'); // Paquete de Terceros
const path = require('path');
const { dbConnection } = require('../database/config');




class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT

        //Declarar los paths de las rutas en un objeto para que quede más limpio
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/home',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares (función que siempre va a ejecutarse cuando levantemos nuestor servidor)
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    //Un middlewares es una función que se ejecuta antes de llamar a un controlador o seguir con la 
    //ejecición de mis peticiones
    middlewares() {

        // CORS - proteje el servidor
        this.app.use(cors());

        // Parseo y lectura del body como el POST
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

        // Directorio EJS (views/html.ejs)
        this.app.engine('html', require('ejs').renderFile);
        this.app.set('view engine', 'html');
        this.app.get('/', (req, res) => {
            res.render('index.ejs');
        })
        this.app.set('views', path.join(__dirname, '../views'));

        // FileUpload - Carga de archivos (En la web del paquete recomiendan usar esta configuración)
        // Sirve para utilizar archivos temporales en lugar de memoria para administrar el proceso de carga.
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true //permite crear carpetas si no existen en la ruta que especifiquemos
        }));

        //Obtener valores del input del FORM de HTML con metodo POST
        // Parse URL-encoded bodies (as sent by HTML forms)
        this.app.use(express.urlencoded());

        //Obtener valores del input del FORM de HTML con metodo POST
        // Parse JSON bodies (as sent by API clients)
        this.app.use(express.json());


    }

    routes() {

        // this.app.use(this.paths.auth, require('../routes/auth'));
        // this.app.use(this.paths.buscar, require('../routes/buscar'));
        // this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        // this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        //this.app.use(this.paths.uploads, require('../routes/uploads'));
    }



    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;