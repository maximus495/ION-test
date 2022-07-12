const express = require('express');
const cors = require('cors');
const config = require('../config') 

class Server {

    constructor() {
        this.app = express();
        this.port = config.api.port;
        this.userTransaction = '/api/transaction'
        this.userAccount = '/api/account';
    
        this.middlewares();
        this.routes();
    } 

    middlewares() {

        //CORS
        this.app.use(cors());

        // Parseo y lectura body - post
        this.app.use(express.json());

        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.userAccount, require('../api/account/network'))
        this.app.use(this.userTransaction, require('../api/transaction/network'))
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log('escuchando http://localhost:',this.port)
        });
    }

}

module.exports = Server;