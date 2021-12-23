import { Telegraf } from 'telegraf';
import { KEYBOARDS } from './keyboards/keyboards';
import { BUTTON_LIST } from './keyboards/consts';
import { PROC_CONTEXT } from './types';
export const ROOT_PATH = __dirname;
import { QueryList } from './Query';
import { getIndicator, getLongShort, getCurrentLS, getBitmexLiq, getBtcLiq, getMergedVolume, getTrendInd, getTickerList, getXTrade, getTotalLiq, getHourlyVolume, getDailyVolume, getLiveTrade, getOhlcv, getTradeVol24h, getOpenInterest, getRapidMov, getVolFlow } from './bot_functions';


let context: PROC_CONTEXT = PROC_CONTEXT.DEFAULT;
let Queries = new QueryList();

const bot = new Telegraf("2048332803:AAEEAR7pVr9Y_n5kcFayNXL5nEGpwa_aIH8");

bot.start((ctx) => {
    ctx.reply("Seçiminizi yapınız...", { reply_markup: KEYBOARDS.DATA });
});

bot.hears('Welcome', ctx => {

    ctx.reply((ctx.message.from.id).toString());

})


bot.hears(BUTTON_LIST.DATA, async (ctx) => {

    const message = ctx.message.text;
    const chat_id = ctx.chat.id;
    let user_com;

    switch (message) {
        case BUTTON_LIST.DATA[0]://Indikatorler
            Queries.newQuery(chat_id, PROC_CONTEXT.INDICATOR);
            ctx.reply("İndikatör seçiniz.", { reply_markup: KEYBOARDS.INDICATOR });
            break;
        case BUTTON_LIST.DATA[1]://Long-Short
            Queries.newQuery(chat_id, PROC_CONTEXT.LONGSHORT);
            ctx.reply("Borsa türünü seçiniz.", { reply_markup: KEYBOARDS.STOCK });
            break;
        case BUTTON_LIST.DATA[2]://Gunluk Long-Short
            Queries.newQuery(chat_id, PROC_CONTEXT.CURRENTLS);
            ctx.reply("Borsa türünü seçiniz:", { reply_markup: KEYBOARDS.STOCK });
            break;
        case BUTTON_LIST.DATA[3]://Likidite (Toplam)
            Queries.newQuery(chat_id, PROC_CONTEXT.TOTALLIQUIDATION);
            ctx.reply("symb yazip sembol seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case BUTTON_LIST.DATA[4]://Likidite (BitCoin Ozel)
            Queries.newQuery(chat_id, PROC_CONTEXT.BINANCELIQUIDATION);
            let LBOreply = await getBtcLiq();
            ctx.reply(LBOreply, { reply_markup: KEYBOARDS.DATA })
            break;
        case BUTTON_LIST.DATA[5]://Likidite (Bitmex Ozel)
            Queries.newQuery(chat_id, PROC_CONTEXT.BITMEXLIQUIDATION);
            ctx.reply("mp yazip coin paritesi seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case BUTTON_LIST.DATA[6]://Trend Sorgu
            Queries.newQuery(chat_id, PROC_CONTEXT.TRENDINDICATOR);
            let TSreply = await getTrendInd();
            ctx.reply(TSreply, { reply_markup: KEYBOARDS.DATA })
            break;
        case BUTTON_LIST.DATA[7]://Hizli Hareket
            Queries.newQuery(chat_id, PROC_CONTEXT.RAPIDMOVEMENT);
            ctx.reply("Borsa türünü seçiniz:", { reply_markup: KEYBOARDS.STOCK });
            break;
        case BUTTON_LIST.DATA[8]://Hacim Akisi
            Queries.newQuery(chat_id, PROC_CONTEXT.VOLUMEFLOW);
            ctx.reply("Zaman araligi seciniz:", { reply_markup: KEYBOARDS.TIMEFRAME });
            break;
        case BUTTON_LIST.DATA[9]://Balina Ticareti
            Queries.newQuery(chat_id, PROC_CONTEXT.XTRADE);
            ctx.reply("Borsa türünü seçiniz:", { reply_markup: KEYBOARDS.STOCK });
            break;
        case BUTTON_LIST.DATA[10]://Canli Ticaret
            Queries.newQuery(chat_id, PROC_CONTEXT.LIVETRADE);
            ctx.reply("Borsa türünü seçiniz:", { reply_markup: KEYBOARDS.STOCK });
            break;
        case BUTTON_LIST.DATA[11]://24 Saatlik Hacim islemi
            Queries.newQuery(chat_id, PROC_CONTEXT.HOURLY24VF);
            ctx.reply("Borsa türünü seçiniz:", { reply_markup: KEYBOARDS.STOCK });
            break;
        case BUTTON_LIST.DATA[12]://OHLCV
            Queries.newQuery(chat_id, PROC_CONTEXT.OHLCV);
            ctx.reply("Borsa türünü seçiniz:", { reply_markup: KEYBOARDS.STOCK });
            break;
        case BUTTON_LIST.DATA[13]://Gunluk Volume
            Queries.newQuery(chat_id, PROC_CONTEXT.DAILYVOL);
            ctx.reply("symb yazip sembol seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case BUTTON_LIST.DATA[14]://Saatlik Volume
            Queries.newQuery(chat_id, PROC_CONTEXT.HOURLYVOL);
            ctx.reply("symb yazip sembol seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case BUTTON_LIST.DATA[15]://Birlestirilmis Volume
            Queries.newQuery(chat_id, PROC_CONTEXT.MERGEDVOL);
            ctx.reply("Exchange tipini seciniz:", { reply_markup: KEYBOARDS.EXCHANGE });
            break;
        case BUTTON_LIST.DATA[16]://TickerList
            Queries.newQuery(chat_id, PROC_CONTEXT.TICKERLIST);
            ctx.reply("Borsa türünü seçiniz:", { reply_markup: KEYBOARDS.STOCK });
            break;
        case BUTTON_LIST.DATA[17]://Acik Kar
            Queries.newQuery(chat_id, PROC_CONTEXT.TICKERLIST);
            ctx.reply("Borsa türünü seçiniz:", { reply_markup: KEYBOARDS.STOCK });
            break;
        default:
            break;
    }


});

bot.hears(BUTTON_LIST.INDICATOR, async (ctx) => {
    const message = ctx.message.text;
    const chat_id = ctx.message.chat.id;
    const context = PROC_CONTEXT.INDICATOR;
    Queries.addDataSafe(chat_id, context, message);
    ctx.reply("Borsa türünü seçiniz.", { reply_markup: KEYBOARDS.STOCK });
});

bot.hears(BUTTON_LIST.STOCK, async (ctx) => {
    const message = ctx.message.text;
    const chat_id = ctx.message.chat.id;
    let query = Queries.getQuery(chat_id);
    let reply = "";
    Queries.addData(chat_id, message);
    switch (query.context) {
        case PROC_CONTEXT.LONGSHORT:
            ctx.reply("pa yazip parite seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.RAPIDMOVEMENT:
            ctx.reply("pa yazip parite seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.OPENINTEREST:
            ctx.reply("mp yazip coin paritesi seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.CURRENTLS:
            ctx.reply("symb yazip sembol seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.TICKERLIST:
            ctx.reply("mp yazip parite seciniz.", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.XTRADE:
            ctx.reply("symb yazip sembol seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.LIVETRADE:
            ctx.reply("pa yazip parite seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.OHLCV:
            ctx.reply("Zaman araligi seçiniz:", { reply_markup: KEYBOARDS.TIMEFRAME });
            break;
        case PROC_CONTEXT.HOURLY24VF:
            ctx.reply("pa yazip parite seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.INDICATOR:
            ctx.reply("Kaynak seciniz:", { reply_markup: KEYBOARDS.SOURCE });
            break;
        default:
            break;
    }
})

bot.hears(BUTTON_LIST.EXCHANGE, async (ctx) => {

    const message = ctx.message.text;
    const chat_id = ctx.message.chat.id;
    const context = PROC_CONTEXT.MERGEDVOL;
    switch (message) {
        case BUTTON_LIST.EXCHANGE[0]://Spot
            Queries.addDataSafe(chat_id, context, "spot");
            break;

        case BUTTON_LIST.EXCHANGE[1]://Vadeli
            Queries.addDataSafe(chat_id, context, "futures");
            break;

        default:
            break;
    }
    ctx.reply("Zaman araligi seciniz:", { reply_markup: KEYBOARDS.TIMEFRAME });
})

bot.hears(BUTTON_LIST.SOURCE, async (ctx) => {

    const message = ctx.message.text;
    const chat_id = ctx.message.chat.id;
    const context = PROC_CONTEXT.INDICATOR;
    switch (message) {
        case BUTTON_LIST.SOURCE[0]: //Acilis
            Queries.addDataSafe(chat_id, context, "open");
            break;
        case BUTTON_LIST.SOURCE[1]://kapanis
            Queries.addDataSafe(chat_id, context, "close");
            break;
        case BUTTON_LIST.SOURCE[2]: //en yuksek
            Queries.addDataSafe(chat_id, context, "high");
            break;
        case BUTTON_LIST.SOURCE[3]://en dusuk
            Queries.addDataSafe(chat_id, context, "low");
            break;
        case BUTTON_LIST.SOURCE[5]: //volume
            Queries.addDataSafe(chat_id, context, "volume");
            break;
        default:
            break;
    }
    ctx.reply("Period yaziniz", { reply_markup: KEYBOARDS.DATA });
})

bot.hears(BUTTON_LIST.TIMEFRAME, async (ctx) => {
    const message = ctx.message.text;
    const chat_id = ctx.message.chat.id;
    let query = Queries.getQuery(chat_id);
    let timeframe = ''
    switch (message) {
        case BUTTON_LIST.TIMEFRAME[0]:
            timeframe = '5m';
            break;
        case BUTTON_LIST.TIMEFRAME[1]:
            timeframe = '15m';
            break;
        case BUTTON_LIST.TIMEFRAME[2]:
            timeframe = '30m';
            break;
        case BUTTON_LIST.TIMEFRAME[3]:
            timeframe = '1h';
            break;
        case BUTTON_LIST.TIMEFRAME[4]:
            timeframe = '4h';
            break;
        case BUTTON_LIST.TIMEFRAME[5]:
            timeframe = 'd';
            break;
        default:
            break;
    }
    Queries.addData(chat_id, timeframe);
    switch (query.context) {
        case PROC_CONTEXT.VOLUMEFLOW:
            ctx.reply("fromto yazip parite seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.OHLCV:
            ctx.reply("pa yazip parite seçiniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.INDICATOR:
            ctx.reply("mp yazip coin seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        case PROC_CONTEXT.MERGEDVOL:
            ctx.reply("symb yazip coin seciniz:", { reply_markup: KEYBOARDS.DATA });
            break;
        default:
            break;
    }
})

bot.hears(/^[0-9]{1,3}/, async (ctx) => {
    const message = ctx.message.text;
    const chat_id = ctx.message.chat.id;
    let query = Queries.getQuery(chat_id);
    if (query.context == PROC_CONTEXT.INDICATOR) {
        Queries.addDataSafe(chat_id, PROC_CONTEXT.INDICATOR, message);
        ctx.reply("Zaman araligi seciniz.", { reply_markup: KEYBOARDS.TIMEFRAME })
    }
    else {
        ctx.reply("Lutfen islem seciniz", { reply_markup: KEYBOARDS.DATA });
    }
});

bot.hears(/(?<=symb ).*/, async (ctx) => {
    const message = ctx.message.text;
    const coin = message.replace('symb ', '');
    const chat_id = ctx.message.chat.id;
    let query = Queries.getQuery(chat_id);
    let reply = "";

    switch (query.context) {
        case PROC_CONTEXT.CURRENTLS:
            reply = await getCurrentLS([query.data[0], coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.MERGEDVOL:
            reply = await getMergedVolume([query.data[0], query.data[1], coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.XTRADE:
            reply = await getXTrade([query.data[0], coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.TOTALLIQUIDATION:
            reply = await getTotalLiq([coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.HOURLYVOL:
            reply = await getHourlyVolume([coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.DAILYVOL:
            reply = await getDailyVolume([coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        default:
            Queries.removeQuery(chat_id);
            break;
    }
})

bot.hears(/(?<=pa ).*/, async (ctx) => {
    const message = ctx.message.text;
    const coin = message.replace('pa ', '');
    const chat_id = ctx.message.chat.id;
    let query = Queries.getQuery(chat_id);
    let reply = "";

    switch (query.context) {
        case PROC_CONTEXT.LIVETRADE:
            reply = await getLiveTrade([query.data[0], coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.OHLCV:
            reply = await getOhlcv([query.data[0], query.data[1], coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.LONGSHORT:
            reply = await getLongShort([query.data[0], query.data[1], coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.RAPIDMOVEMENT:
            reply = await getRapidMov([query.data[0], coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.HOURLY24VF:
            reply = await getTradeVol24h([query.data[0], coin]);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        default:
            Queries.removeQuery(chat_id);
            break;
    }
})

bot.hears(/(?<=mp ).*/, async (ctx) => {
    const message = ctx.message.text;
    const coin = message.replace('mp ', '');
    const chat_id = ctx.message.chat.id;
    let query = Queries.getQuery(chat_id);
    Queries.addData(chat_id, coin);
    let reply = "";

    switch (query.context) {
        case PROC_CONTEXT.INDICATOR:
            reply = await getIndicator(query.data);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.BITMEXLIQUIDATION:
            reply = await getBitmexLiq(query.data);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.OPENINTEREST:
            reply = await getOpenInterest(query.data);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        case PROC_CONTEXT.TICKERLIST:
            reply = await getTickerList(query.data);
            ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
            Queries.removeQuery(chat_id);
            break;
        default:
            Queries.removeQuery(chat_id);
            break;

    }
})

bot.hears(/(?<=fromto ).*/, async (ctx) => {
    const message = ctx.message.text;
    const coins = message.split(' ');//split yapicammmmmm
    const chat_id = ctx.message.chat.id;
    const context = PROC_CONTEXT.VOLUMEFLOW;
    let query = Queries.getQuery(chat_id);
    Queries.addDataSafe(chat_id, context, coins[1]);
    Queries.addDataSafe(chat_id, context, coins[2]);
    let reply = await getVolFlow(query.data);
    ctx.reply(reply, { reply_markup: KEYBOARDS.DATA });
    Queries.removeQuery(chat_id);
})

bot.hears(/(?<=stop pls).*/, async (ctx) => {
    //DELETE ALL QUERIES FUNCTION WILL BE ADDED
    ctx.reply("Everything is fine.", { reply_markup: KEYBOARDS.DATA })
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))