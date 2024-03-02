require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('connected to MongoDB');

    const currencyController = require('./controllers/currencyController');
    app.use('/', currencyController);
    app.listen(3000, ()=>{
        console.log("App is running on port 3000");
    })

}).catch((error)=>{
    console.log(error);
})