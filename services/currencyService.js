const dataSource = require("./dbService").prototype.getAll()

const calculate = async (currency) =>{
    console.log(currency)
    if (!currency || currency.value === undefined || currency.value <= 0.0 || isNaN(currency.value)) {
        return{
            status: 501,
            message: "Bad currency"
        }
    }

    try{
        const rates = await dataSource

        const baseRate = rates.find(rate => rate.code === currency.code); //pln to usd

        return rates.map(rate => {
            const recalculatedValue = (currency.value * baseRate.value) / rate.value
            return {
                code: rate.code,
                value: recalculatedValue
            };
        });

    }catch (error){
        console.error(error)
        return{
            status: 500,
            message: "Error while recalculating currencies",
            error: error.message
        }
    }
}

module.exports = calculate;