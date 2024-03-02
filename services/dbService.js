const Currency = require("./../models/currency")
const fetchData = require("./providerService");
const CurrencyDTO = require("./../dtos/currencyDTO")
const moment = require('moment');

class DatabaseService {
    async addCurrency(currencyDTO) {
        try {
            const existingCurrency = await Currency.findOne({code: currencyDTO.code});

            if (existingCurrency) {
                return {
                    status: 201,
                    message: "Currency already exists",
                }
            } else {
                await Currency.create(currencyDTO);
                return {
                    status: 200,
                    message: "Added new custom currency"
                }
            }

        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: "Error while adding custom currency",
                error: error.message
            }
        }
    }

    async getCurrency(code){
        try{
            const currency = await Currency.findOne({code: code})
            if (currency){
                return new CurrencyDTO(currency.name, currency.code, currency.value)
            } else return {
                status: 201,
                message: "Currency doesn't exist"
            }

        }catch (error) {
            console.error(error)
            return{
                status: 500,
                message: "Error while getting currency",
                error: error.message
            }
        }
    }

    async getAll(){
        try{
            const currencies = await Currency.find()
            if (currencies.length > 0){
                return currencies.map(currency => new CurrencyDTO(currency.name, currency.code, currency.value))
            } else return {
                status: 201,
                message: "No currencies in database"
            }

        } catch (error){
            console.error(error)
            return{
                status: 500,
                message: "Error while getting all currencies",
                error: error.message
            }
        }
    }

    async updateDatabase(){
        const checker = await Currency.findOne({code: 'USD'})

        if (moment().diff(moment(checker.updatedAt), 'hours') <= 2){
            return {
                status: 201,
                message: "Database is up to date!"
            }
        }

        try {
            const currencies = await fetchData()
            for (const currency of currencies) {
                const existingCurrency = await Currency.findOne({code: currency.code});

                if (existingCurrency) {
                    await Currency.findOneAndUpdate(
                        {code: currency.code},
                        {$set: {value: currency.value}},
                    );
                } else {
                    await Currency.create(currency);
                }
            }

            return {
                status: 200,
                message: "Updated database!"
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Error while updating database",
                error: error.message
            }
        }
    }

}

module.exports = DatabaseService