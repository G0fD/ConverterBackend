require('dotenv').config()
const axios = require('axios');

const fetchData = async () =>{
    //open free banking API
    const url = process.env.API;

    try {
        const response = await axios.get(url);
        const jsonData = response.data.flatMap(item => item.rates);

        //USD rate
        let PLNtoUSD;
        for (const item of jsonData) {
            if (item.code === 'USD') {
                PLNtoUSD = item.mid;
                break;
            }
        }

        //add PLN
        const PLN = {
            name: 'złoty polski',
            code: 'PLN',
            value: (1 / PLNtoUSD).toFixed(8)
        }
        jsonData.push(PLN)

        //get USD rate for all currencies
        return jsonData.map(item => {
            if (item.code !== 'PLN') {
                const cenaUSD = item.mid / PLNtoUSD;
                return {
                    name: item.currency,
                    code: item.code,
                    value: parseFloat(cenaUSD.toFixed(8))
                };
            } else return item;
        });

    } catch (error){
        console.error('Error while fetching API data', error);
        throw error;
    }
}

module.exports = fetchData;