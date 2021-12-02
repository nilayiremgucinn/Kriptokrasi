import { Telegraf } from 'telegraf';
import { KEYBOARDS } from './keyboards/keyboards';
import { BUTTON_LIST } from './keyboards/consts';
import path from 'path';
//import DatabaseManager from './database';
import { PROC_CONTEXT } from './types';
export const ROOT_PATH = __dirname;
import { QueryList } from './Query';
import { getIndicator, getLongShort, getCurrentLS, getBitmexLiq, getBtcLiq, getMergedVolume } from './bot_functions';

//const database = new DatabaseManager();

let context: PROC_CONTEXT = PROC_CONTEXT.DEFAULT;
//let queue = new Array<Query>();
let Queries = new QueryList();

const bot = new Telegraf("2048332803:AAEEAR7pVr9Y_n5kcFayNXL5nEGpwa_aIH8");

bot.start((ctx) => {
    ctx.reply("Seçiminizi yapınız...", { reply_markup: KEYBOARDS.DATA });
});


bot.hears(BUTTON_LIST.DATA, (ctx) => {

    const message = ctx.message.text;
    const chat_id = ctx.chat.id;
    let user_com;

    switch (message) {
        case BUTTON_LIST.DATA[0]://Indikatorler
            ctx.reply("Aldim cnm");

            break;
        case BUTTON_LIST.DATA[1]://Long-Short
            break;
        case BUTTON_LIST.DATA[2]://Gunluk Long-Short

            Queries.newQuery(chat_id, PROC_CONTEXT.CURRENTLS);
            ctx.reply("Borsa türünü seçiniz:", { reply_markup: KEYBOARDS.STOCK });

            break;
        case BUTTON_LIST.DATA[3]://Likidite (Toplam)
            break;
        case BUTTON_LIST.DATA[4]://Likidite (Binance Ozel)
            break;
        case BUTTON_LIST.DATA[5]://Likidite (Bitmex Ozel)
            break;
        case BUTTON_LIST.DATA[6]://Trend Sorgu
            break;
        case BUTTON_LIST.DATA[7]://Hizli Hareket
            break;
        case BUTTON_LIST.DATA[8]://Hacim Akisi
            break;
        case BUTTON_LIST.DATA[9]://Balina Ticareti
            break;
        case BUTTON_LIST.DATA[10]://Canli Ticaret
            break;
        case BUTTON_LIST.DATA[11]://24 Saatlik Hacim islemi
            break;
        case BUTTON_LIST.DATA[12]://OHLCV
            break;
        case BUTTON_LIST.DATA[13]://Gunluk Volume
            break;
        case BUTTON_LIST.DATA[14]://Saatlik Volume
            break;
        case BUTTON_LIST.DATA[15]://Birlestirilmis Volume

            Queries.newQuery(chat_id, PROC_CONTEXT.MERGEDVOL);
            ctx.reply("Exchange tipini seciniz:", { reply_markup: KEYBOARDS.EXCHANGE });

            break;
        case BUTTON_LIST.DATA[16]://TickerList
            break;
        case BUTTON_LIST.DATA[17]://Acik Kar
            break;

        default:
            break;
    }


});

// bot.hears(BUTTON_LIST.INDICATOR, (ctx: Context) => {

//     let user = queue.find(user=> user.chat_id == ctx.message.chat.id)
//     if ((user != null) && (user.context === PROC_CONTEXT.INDICATOR)){
//         user.addData(ctx.message.text);
//         ctx.reply("Kaynak Seciniz:", { reply_markup: KEYBOARDS.SOURCE });
//     }
// });

bot.hears(BUTTON_LIST.STOCK, (ctx) => {

    Queries.addData(ctx.message.chat.id, ctx.message.text);
    ctx.reply("symb yazip sembol seciniz:", { reply_markup: KEYBOARDS.DATA });

})

bot.hears(BUTTON_LIST.EXCHANGE, (ctx) => {

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

    ctx.reply("Zaman araligi yazip sembol seciniz:", { reply_markup: KEYBOARDS.TIMEFRAME });


})

bot.hears(/(?<=symb ).*/, async (ctx) => {

    const message = ctx.message.text;
    const chat_id = ctx.message.chat.id;
    let query = Queries.getQuery(chat_id);
    let reply = "";

    ctx.reply(message);
    return;

    switch (query.context) {
        case PROC_CONTEXT.CURRENTLS:
            reply = await getCurrentLS([query.data[0],] )
            
            
            break;
        case PROC_CONTEXT.MERGEDVOL:

            break;
        default:
            break;
    }


    // let user = queue.find(user => user.chat_id == ctx.message.chat.id)
    // if ((user != null) && (user.context === PROC_CONTEXT.CURRENTLS)) {
    //     let msg = await getCurrentLS([user.data[0], ctx.message.text.replace("symb ", "")]);
    //     console.log(ctx.message.text.replace("symb ", ""));
    //     ctx.reply(msg, { reply_markup: KEYBOARDS.DATA });
    // }
    // if ((user != null) && (user.context === PROC_CONTEXT.MERGEDVOL)) {
    //     let msg = await getMergedVolume([user.data[0], user.data[1], ctx.message.text.replace("symb ", "")]);
    //     ctx.reply(msg, { reply_markup: KEYBOARDS.DATA });
    // }
})

// bot.hears(BUTTON_LIST.SOURCE, (ctx: Context) => {

//     let user = queue.find(user=> user.chat_id == ctx.message.chat.id)
//     if ((user != null) && (user.context === PROC_CONTEXT.INDICATOR)){
//         user.addData(ctx.message.text);
//         ctx.reply("Zaman dilimi giriniz [1-300]:");
//     }
// })

// bot.hears(/[0-9]{1,3}/, (ctx: Context) => {

//     let user = queue.find(user=> user.chat_id == ctx.message.chat.id)
//     if ((user != null) && (user.context === PROC_CONTEXT.INDICATOR)){
//         user.addData(ctx.message.text)
//         ctx.reply("Zaman araligi seciniz:",{reply_markup:KEYBOARDS.TIMEFRAME});
//     }
// });

bot.hears(BUTTON_LIST.TIMEFRAME, (ctx) => {


    // Queries.addDataSafe(ctx.message.chat.id,)

    // let user = queue.find(user => user.chat_id == ctx.message.chat.id)
    // if ((user != null) && (user.context === PROC_CONTEXT.MERGEDVOL)) {
    //     user.addData('15m');
    //     ctx.reply("symb yazip sembol seciniz:", { reply_markup: KEYBOARDS.DATA });
    // }
})



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))