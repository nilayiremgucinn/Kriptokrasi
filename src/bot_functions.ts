import axios from "axios";
import { buffer } from "stream/consumers";

export async function getIndicator(data: string[]) {
    const ind = data[0];
    const market_pair = data[1]
    const e = data[2];
    const tf = data[3];
    const source = data[5]
    const period = data[4]

    let response = await axios.get(`https://api.cryptometer.io/indicator-${ind}/?market_pair=${market_pair}&source=${source}&e=${e}&period=${period}&timeframe=${tf}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);

    return response.data
}


export async function getLongShort(data: string[]) {
    const pair = data[0].toUpperCase();
    const e = data[1].toLowerCase();
    const tf = data[2];

    let response = await axios.get(`https://api.cryptometer.io/ls-ratio/?pair=${pair}&e=${e}&timeframe=${tf}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);
    //let msg = 
    return response.data["data"][0]
}

export async function getCurrentLS(data: string[]) {
    const symbol = data[1].toLowerCase();
    const e = data[0].toLowerCase();

    let response = await axios.get(`https://api.cryptometer.io/current-day-long-short-v2/?symbol=${symbol}&e=${e}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);
    let msg = `Longs: ${response.data["data"][0]["longs"]}, Shorts: ${response.data["data"][0]["shorts"]}`;
    return msg;
}

export async function getTotalLiq(data: string[]) {
    const symbol = data[0].toLowerCase();

    let response = await axios.get(`https://api.cryptometer.io/liquidation-data-v2/?symbol=${symbol}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);

    return response.data["data"][0]
}

export async function getBtcLiq() {
    let response = await axios.get(`https://api.cryptometer.io/liquidation-data/?&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);

    return response.data["data"][0]
}

export async function getBitmexLiq(data: string[]) {
    const market_pair = data[0].toUpperCase();

    let response = await axios.get(`https://api.cryptometer.io/bitmex-liquidation/?market_pair=${market_pair}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);

    return response.data["data"][0]
}

export async function getTrendInd() {

    let response = await axios.get(`https://api.cryptometer.io/trend-indicator-v3/?api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);
    let msg = `Trend Skoru: ${response.data["data"][0]['trend_score']} \n Alış Baskısı: ${response.data["data"][0]['buy_pressure']} \n Satış Baskısı: ${response.data["data"][0]['sell_pressure']}`

    return msg;
}


export async function getRapidMov(data: string[]) { //data: pair exchange

    let response = await axios.get(`https://api.cryptometer.io/rapid-movement/?api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);

    let msg = "Coinde son bir saat icerisinde dump yada pump hareketi bulunamadi"
    const pair = data[1].toLowerCase()

    for (let i=0; i<response.data["data"].size(); i++){
        if (response.data["data"][i]["pair"] == pair){
            if (response.data["data"][i]["exchange"] == data[1]){
                msg = `pair:${response.data["data"][i]['pair']}, exchange:${response.data["data"][i]['exchange']}, değişim:${response.data["data"][i]['change_detected']}, taraf:${response.data["data"][i]['side']}`
            }
        }
    }

    return msg
}

export async function getVolFlow (data: string[]){ //data: timeframe fromcoin tocoin
    let response = await axios.get(`https://api.cryptometer.io/volume-flow/?timeframe=${data[0]}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);
    let buy_flow = response.data["data"]["buy_flow"]
    let sell_flow = response.data["data"]['sell_flow']
    let vol = 0.0
    const fromCoin = data[1].toUpperCase()
    const toCoin = data[2].toUpperCase()
    let msg = ""
    for (let i=0; i<buy_flow.size(); i++){
        if ((buy_flow[i]["from"] == fromCoin) && (buy_flow[i]["to"] == toCoin)){
            vol = buy_flow[i]["volume"]
            msg = `Volume: ${vol}, Akış: Alım`
        }                      
    }
    for (let i=0; i<sell_flow.size(); i++){
        if ((sell_flow[i]["from"] == fromCoin) && (sell_flow[i]["to"] == toCoin)){
            vol = sell_flow[i]["volume"]
            msg = `Volume: ${vol}, Akış: Satım`
        }                      
    }  
    return msg
}

export async function getXTrade(data: string[]) { 
    const symbol = data[1].toLowerCase();
    const e = data[0];

    let response = await axios.get(`https://api.cryptometer.io/xtrades/?symbol=${symbol}&e=${e}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);

    let maxB = 0.0
    let maxS = 0.0
    for (let i=0; i<response.data["data"].size(); i++){
        if (response.data["data"][i]["side"] == "BUY"){
            if (response.data["data"][i]["price"].parseFloat() > maxB)
                maxB = response.data["data"][i]["price"].parseFloat();
        }
        if (response.data["data"][i]["side"] == "SELL"){
            if (response.data["data"][i]["price"].parseFloat() > maxS)
                maxS = response.data["data"][i]["price"].parseFloat();
        }
    }
    let msg = `Son 3 skor: ${response.data["data"][0]} \n ${response.data["data"][1]} \n ${response.data["data"][2]} \n Max But: ${maxB}    Max Sell: ${maxS}`;                   

    return msg
}

export async function getLiveTrade(data: string[]) { 
    const pair = data[1].toLowerCase();
    const e = data[0];

    let response = await axios.get(`https://api.cryptometer.io/live-trades/?pair=${pair}&e=${e}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);

    //let msg = `Son 3 skor: ${response.data[0]}`;


    return response.data["data"]
}

export async function getTradeVol24h(data: string[]) { 
    const pair = data[1].toUpperCase();
    const e = data[0];

    let response = await axios.get(`https://api.cryptometer.io/24h-trading-volume-v2/?pair=${pair}&e=${e}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);

    //let msg = `Son 3 skor: ${response.data[0]}`;
    return response.data["data"]
}

export async function getOhlcv(data: string[]) { 
    const pair = data[1].toLowerCase();
    const e = data[0];

    let response = await axios.get(`https://api.cryptometer.io/24h-trading-volume-v2/?pair=${pair}&e=${e}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);

    let maxO = 0.0
    let maxC = 0.0
    let maxH = 0.0
    let maxL = 0.0
    let maxV = 0.0
    let maxB = 0.0
    let maxS = 0.0
    let maxBT = 0.0
    let maxST = 0.0
    for (let i=0; i<response.data["data"].size(); i++){
        if (response.data["data"][i]["open"] > maxO)
            maxO = response.data["data"][i]["open"]
        if (response.data["data"][i]["close"] > maxC)
            maxC = response.data["data"][i]["close"]
        if (response.data["data"][i]["high"] > maxH)
            maxH = response.data["data"][i]["high"]
        if (response.data["data"][i]["low"] > maxL)
            maxL = response.data["data"][i]["low"]
        if (response.data["data"][i]["volume"] > maxV)
            maxV = response.data["data"][i]["volume"]
        if (response.data["data"][i]["buy"] > maxB)
            maxB = response.data["data"][i]["buy"]
        if (response.data["data"][i]["sell"] > maxS)
            maxS = response.data["data"][i]["sell"]
        if (response.data["data"][i]["buy_total"] > maxBT)
            maxBT = response.data["data"][i]["buy_total"]
        if (response.data["data"][i]["sell_total"] > maxST)
            maxST = response.data["data"][i]["sell_total"];
    }
        

    let msg = `Max Open değer: ${maxO} \n Max Kapanis değer: ${maxC} \n Max Yuksek değer: ${maxH} \n Max dusus değer: ${maxL} \n Max Hacim değeri:${maxV} \n Max Alim değeri: ${maxB}\n Max Satis değeri: ${maxS} \n Max Alis toplam değer: ${maxBT} \n Max Satis toplam değeri: ${maxST}`;
    return msg;
}

export async function getDailyVolume(data: string[]) { 
    const symbol = data[1].toUpperCase();
    const e = data[0];

    let response = await axios.get(`https://api.cryptometer.io/current-day-merged-volume-v2/?symbol=${symbol}&e=${e}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);

    //let msg = `Son 3 skor: ${response.data[0]}`;
    return response.data["data"]
}

export async function getHourlyVolume(data: string[]) { 
    const symbol = data[1].toLowerCase();

    let response = await axios.get(`https://api.cryptometer.io/hourly-buy-sell-merged-volume/?symbol=${symbol}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);
    //let msg = `Son 3 skor: ${response.data[0]}`;
    return response.data["data"]
}

export async function getMergedVolume(data: string[]) { 
    const symbol = data[2].toLowerCase();
    const exhange_type = data[0]; //spot or futures
    const timeframe = data[1];

    let response = await axios.get(`https://api.cryptometer.io/merged-trade-volume/?symbol=${symbol}&exchange_type=${exhange_type}&timeframe=${timeframe}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);
    let msg = `Alim: ${response.data["data"][0]["buy"]} ve Satim: ${response.data["data"][0]["sell"]}`;

    return msg;
}


export async function getTickerList(data: string[]) { 
    const pair = data[1].toUpperCase();
    const e = data[0]; 

    let response = await axios.get(`https://api.cryptometer.io/current-day-merged-volume-v2/?&e=${e}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);
    let msg = ""
    for (let i=0; i<response.data["data"].size(); i++){
        if (response.data["data"][i]["market_pair"] == pair)
            msg = response.data["data"][i];
    }

    return msg;
}

export async function getOpenInterest(data: string[]) { 
    const market_pair = data[1].toLowerCase();
    const e = data[0]; //spot or futures
    let msg = ""
    let response = await axios.get(`https://api.cryptometer.io/merged--trade-volume/?market_pair=${market_pair}&e=${e}&api_key=fT3TiQG131f3ZEqVPmK45WeFZJ90Z4pPpk6XYf1e`);
    if (response.status != 200)
        msg = "Toplam veri yetersiz.";
    //let msg = `Son 3 skor: ${response.data[0]}`;
    return response.data["data"]
}
