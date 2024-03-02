require('dotenv').config()

const axios = require('axios');
const xml2js = require('xml2js');

const fetchData = (callback) => {
    axios.get(process.env.BANKING)
        .then(response => {
            const xmlData = response.data;
            xml2js.parseString(xmlData, function (err, result) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                }
                else {
                    const positions = result.tabela_kursow.pozycja;
                    const positionsArray = Array.isArray(positions) ? positions : [positions];

                    //get USD value
                    let PLNtoUSD = 0;
                    for (const position of positionsArray) {
                        if (position.kod_waluty.value === 'USD') {
                            PLNtoUSD = parseFloat(position.kurs_sredni.value.replace(',', '.'));
                            break;
                        }
                    }

                    const currenciesJson = positionsArray.map(position => {
                        return {
                            przelicznik: parseFloat(position.przelicznik[0].value),
                            kod_waluty: position.kod_waluty[0].value,
                            kurs_sredni: parseFloat(position.kurs_sredni[0].value.replace(',', '.')),
                            kurs_usd: parseFloat(position.przelicznik[0].value) * PLNtoUSD
                        }
                    })

                    console.log(currenciesJson);
                    callback(null, currenciesJson);
                }
            });
        })
        .catch(error => {
            console.error(error);
            callback(error, null);
        });
};

module.exports = fetchData;