require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT
}));

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('connected to MongoDB');

    const currencyController = require('./controllers/currencyController');
    app.use('/api', currencyController)
    app.listen(3000, ()=>{
        console.log("App is running on port 3000")
    })

}).catch((error)=>{
    console.log(error);
})