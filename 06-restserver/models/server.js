const cors = require('cors')
const express = require('express')




class Server {

    constructor() {

        this.app = express()

        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';

        //middlewares
        this.middleware();
        this.app.use(cors())
            //rutas de mi aplicacion
        this.routes();
    }

    middleware() {
        //directorio publico
        this.app.use(express.static('public'))
    }

    routes() {

        this.app.use('/api/usuarios', require('../routes/usuarios'));
    }



    listen() {

        this.app.listen(this.port, () => {
            console.log('escuchando en puerto ', this.port);
        });
    }
}


module.exports = Server;