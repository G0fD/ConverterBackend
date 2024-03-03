const dataSource = require("./dbService").prototype.getAll()

const calculate = async (currency) =>{
    if (!currency || currency.value === undefined || currency.value <= 0.0 || isNaN(currency.value)) {
        return{
            status: 501,
            message: "Bad currency or <=0 quantity"
        }
    }

    try{
        const rates = await dataSource

        const baseRate = rates.find(rate => rate.code === currency.code); //pln to usd

        return rates.map(rate => {
            const recalculatedValue = (currency.value * baseRate.value) / rate.value
            return {
                code: rate.code,
                value: recalculatedValue,
                name: rate.name
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