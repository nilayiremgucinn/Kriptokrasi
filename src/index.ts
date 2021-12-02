import { Telegraf, Markup, Telegram, Context } from 'telegraf';
import axios from 'axios';
import { KEYBOARDS } from './keyboards/keyboards';
import { nextTick } from 'process';
import { BUTTON_LIST, dataArr } from './keyboards/consts';
import { data_keyboard_callback } from './callbacks/data_keyboard';
import path from 'path';
import DatabaseManager from './database';
import { PROC_CONTEXT } from './types';
export const ROOT_PATH = __dirname;
import { Query } from './Query';
import { getIndicator, getLongShort, getCurrentLS, getBitmexLiq,getBtcLiq, getMergedVolume } from './bot_functions';
const database = new DatabaseManager();

let context: PROC_CONTEXT = PROC_CONTEXT.DEFAULT;
let queue = new Array<Query> ();


const bot = new Telegraf("2048332803:AAEEAR7pVr9Y_n5kcFayNXL5nEGpwa_aIH8");

bot.start((ctx: any) => {
    ctx.reply("Seçiminizi yapınız...", { reply_markup: KEYBOARDS.DATA });
});


bot.hears(BUTTON_LIST.DATA, (ctx: any) => {
    if (ctx.message.text === "Gunluk Long-Short"){
        let userCom = new Query (ctx.message.chat.id, PROC_CONTEXT.CURRENTLS);
        queue.push(userCom);
        ctx.reply("Borsa türünü seçiniz:", { reply_markup: KEYBOARDS.STOCK});
    }
    else if (ctx.message.text === "Birlestirilmis Volume" ){
        let userCom = new Query (ctx.message.chat.id, PROC_CONTEXT.MERGEDVOL);
        queue.push(userCom);
        ctx.reply("Exchange tipini seciniz:", {reply_markup:KEYBOARDS.EXCHANGE});
    }
    
});

// bot.hears(BUTTON_LIST.INDICATOR, (ctx: Context) => {

//     let user = queue.find(user=> user.chat_id == ctx.message.chat.id)
//     if ((user != null) && (user.context === PROC_CONTEXT.INDICATOR)){
//         user.addData(ctx.message.text);
//         ctx.reply("Kaynak Seciniz:", { reply_markup: KEYBOARDS.SOURCE });
//     }
// });

bot.hears(BUTTON_LIST.STOCK, (ctx: any) => {

    let user = queue.find(user=> user.chat_id == ctx.message.chat.id)
    if ((user != null) && (user.context === PROC_CONTEXT.CURRENTLS)){
        user.addData(ctx.message.text);
        ctx.reply("symb yazip sembol seciniz:", { reply_markup: KEYBOARDS.DATA });
    }
})

bot.hears(BUTTON_LIST.EXCHANGE, (ctx: any) => {

    let user = queue.find(user=> user.chat_id == ctx.message.chat.id)
    let exchange = 'spot';
    if (ctx.message.text === 'Vadeli')
        exchange='futures';
    
    if ((user != null) && (user.context === PROC_CONTEXT.MERGEDVOL)){
        user.addData(exchange);
        ctx.reply("Zaman araligi yazip sembol seciniz:", { reply_markup: KEYBOARDS.TIMEFRAME });
    }
})

bot.hears(/symb .*/, async (ctx: any) => {
    let user = queue.find(user=> user.chat_id == ctx.message.chat.id)
    if ((user != null) && (user.context === PROC_CONTEXT.CURRENTLS)){
        let msg = await getCurrentLS([user.data[0], ctx.message.text.replace("symb ", "")]);
        console.log(ctx.message.text.replace("symb ", ""));
        ctx.reply(msg, { reply_markup: KEYBOARDS.DATA });
    }
    if ((user != null) && (user.context === PROC_CONTEXT.MERGEDVOL)){
        let msg = await getMergedVolume([user.data[0], user.data[1], ctx.message.text.replace("symb ", "")]);
        ctx.reply(msg, { reply_markup: KEYBOARDS.DATA });
    }
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

bot.hears(BUTTON_LIST.TIMEFRAME, async (ctx:any) =>{

    let user = queue.find(user=> user.chat_id == ctx.message.chat.id)
    if ((user != null) && (user.context === PROC_CONTEXT.MERGEDVOL)){
        user.addData('15m');
        ctx.reply("symb yazip sembol seciniz:", { reply_markup: KEYBOARDS.DATA });
    }
})



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))