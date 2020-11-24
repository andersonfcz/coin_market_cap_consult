/*
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const key = fs.readFileSync(path.resolve('./cryptoConsult/', 'key.txt')).toString();
*/

const fetchData = async () => {
    const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' + key);
    if (!response.ok) throw new Error('Error status:' + response.status);
    
    const { data } = await response.json();
    return data;
}

fetchData().catch(console.error);

const top10Currencies = async () => {
    const data = await fetchData();
    return data.filter(data => data.rank <= 10).sort((data1, data2) => {
        if (data1.rank > data2.rank) return 1
        if (data1.rank < data2.rank) return -1
        return 0
    });
}

top10Currencies().then(data => {
    var texto = "";
    for (let coin of data) {
        const date = new Date(coin.first_historical_data);
        texto = texto +         
        `                  
         <div class="media">
            <img src="coin.jpg" class="align-self-center mr-3" alt="coin" width="100" height="60">
            <div class="media-body">
                <h5 class="mt-2">${coin.name}</h5>
                <p>${coin.symbol}</p>
                <p>First historical data: ${date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()}</p>
            </div>
        </div>
               
                    `;
    document.getElementById("coins").innerHTML = texto;                    
    }
})
