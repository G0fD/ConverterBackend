const mongoose = require('mongoose')
const { Schema } = mongoose;

const currencySchema = new Schema({
    name: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: [true, "Enter currency code"]
    },
    value: {
        type: Number,
        required: [true, "Enter currency value"]
    }
},
{
    timestamps:true
})

const Currency = mongoose.model('Currency', currencySchema);
module.exports = Currency;