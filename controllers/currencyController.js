const express = require("express")
const DatabaseService = require("./../services/dbService")
const calculate = require("./../services/currencyService");

const dbManager = new DatabaseService()
const app = express()
const router = express.Router()

app.use(express.json())

router.post('/getByCode', async (req, res) =>{
    const result = await dbManager.getCurrency(req.body.code)
    res.send(result)
    console.log(result)
})

router.get('/getAll', async (req,res) =>{
    const result = await dbManager.getAll()
    res.send(result)
})

router.post('/addCurrency', async (req,res) =>{
    const result = await dbManager.addCurrency(req.body)
    result.error = result.error ?? "";
    res.status(result.status).json({message: result.message + " "+ result.error})
})

router.get('/updateDatabase', async (req, res) =>{
    const result = await dbManager.updateDatabase()
    result.error = result.error ?? "";
    res.status(result.status).json({message: result.message + " "+ result.error})
})

router.post('/recalculate', async (req, res) =>{
    const result = await calculate(req.body)
    res.send(result)
    console.log(result)
})

module.exports = router;