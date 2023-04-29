const express = require('express')
const app = express();
const  https = require('https')
const http = require('http')
const errorMiddleware =  require('./middlewares/error')
const cookieParser =  require('cookie-parser')

app.use(express.json());
app.use(cookieParser())



//Importing all routes
const products = require ('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)


//Middleware to handle erros
app.use(errorMiddleware);


module.exports = app