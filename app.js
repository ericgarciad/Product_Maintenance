require('dotenv').config();  // Paquete de Terceros

const Server = require('./models/server');

const server = new Server();

server.listen();