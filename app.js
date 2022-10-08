const express = require("express");
const mongoose = require('mongoose');

const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const usuariosRouter = require('./routes/usuario.router');
const cursosRouter = require('./routes/curso.router');
const authRouter = require('./routes/auth.router');

require('dotenv').config();

const config = {
    DB_PASSWORD: process.env.DB_PASSWORD
}

const DB_PASSWORD = encodeURIComponent(config.DB_PASSWORD);

class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        mongoose.connect(
            `mongodb+srv://keith:${DB_PASSWORD}@cluster0.zis84pu.mongodb.net/?retryWrites=true&w=majority`    
        );       
    }

    middlewares(){
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(bodyParser.json());

        this.express.use('/usuario', usuariosRouter);
        this.express.use('/curso', cursosRouter);
        this.express.use('/auth', authRouter);
    }
}

module.exports = new AppController().express;