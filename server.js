const mongoose = require('mongoose');
const app = require('./app');

require('dotenv').config();

const config = {
    DB_PASSWORD: process.env.DB_PASSWORD
}

const DB_PASSWORD = encodeURIComponent(config.DB_PASSWORD);

const PORT = process.env.PORT || 4000;

mongoose.connect(
    `mongodb+srv://keith:${DB_PASSWORD}@cluster0.zis84pu.mongodb.net/?retryWrites=true&w=majority`    
)
.then(() => {
    console.log("Conectado ao Mongo DB")
    app.listen(PORT)
})
.catch((err) => {
    console.log(err)
})