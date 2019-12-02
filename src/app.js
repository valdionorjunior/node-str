'user strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');//modulo para conexao com o MongoDB
//configurações
const config = require('./config');

const app = express();

//Connecta Banco
mongoose.connect(config.connectionString,{useNewUrlParser: true});
// mongoose.set('useUnifiedTopology:', true);

//Carregando os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carrega rotas
const indexRoutes = require('./routes/index-routes');
const productRoutes = require('./routes/product-routes');
const customerRoutes = require('./routes/customer-routes');
const orderRoutes = require('./routes/order-routes');

app.use(bodyParser.json({ limit: '5mb'})); //adicionado limite de 5mb por conta de imagens em base 64 não estourar o json
app.use(bodyParser.urlencoded({ extended: false }));

//Resolvendo Cors
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    next();
});

app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

module.exports = app;
