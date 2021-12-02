import {PROC_CONTEXT} from '.././types';

export const BUTTON_LIST = {

    INDICATOR: ["RSI", "MACD", "SMA", "EMA", "MA", "ATR", "CCI"],
    SOURCE: ["Açılış", "Kapanış", "En Yüksek", "En Alçak", "Volume"],
    DATA: ["Indikatorler", "Long-Short", "Gunluk Long-Short", "Likidite (Toplam)", "Likidite (Binance Ozel)", "Likidite (Bitmex Ozel)", "Trend Sorgu", "Hizli Hareket", "Hacim Akisi", "Balina Ticareti", "Canli Ticaret", "24 Saatlik Islem Hacmi", "OHLCV", "Gunluk Volume", "Saatlik Volume", "Birlestirilmis Volume", "TickerList", "Acik Kar"],
    //DATADict: {"Indikatorler":0, "Long-Short":1, "Gunluk Long-Short":2, "Likidite (Toplam)":3, "Likidite (Binance Ozel)":4, "Likidite (Bitmex Ozel)":5, "Trend Sorgu":6, "Hizli Hareket":7, "Hacim Akisi":8, "Balina Ticareti":9, "Canli Ticaret":10, "24 Saatlik Islem Hacmi":11, "OHLCV":12, "Gunluk Volume":13, "Saatlik Volume":14, "Birlestirilmis Volume":15, "TickerList":16, "Acik Kar":17},
    TIMEFRAME: ['5 Dakika', '15 Dakika', '30 Dakika', '1 Saat', '4 Saat', '1 Gun'],
    EXCHANGE: ['Spot', 'Vadeli'],
    STOCK: ['Binance', 'Binance_Futures', 'Bitmex']
}

export const dataArr = [PROC_CONTEXT.INDICATOR, PROC_CONTEXT.CURRENTLS,PROC_CONTEXT.LONGSHORT,PROC_CONTEXT.TOTALLIQIDATION,PROC_CONTEXT.BINANCELIQIDATION,PROC_CONTEXT.BITMEXLIQIDATION,PROC_CONTEXT.TRENDINDICATOR,PROC_CONTEXT.RAPIDMOVEMENT,PROC_CONTEXT.VOLUMEFLOW,PROC_CONTEXT.XTRADE,PROC_CONTEXT.LIVETRADE,PROC_CONTEXT.HOURLY24VF,PROC_CONTEXT.OHLCV,PROC_CONTEXT.DAILYVOL,PROC_CONTEXT.HOURLYVOL,PROC_CONTEXT.MERGEDVOL,PROC_CONTEXT.TICKERLIST,PROC_CONTEXT.OPENINTEREST]

