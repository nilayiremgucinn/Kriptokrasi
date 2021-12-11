import { Context } from "telegraf"
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"

import {User} from 'telegraf/typings/core/types/typegram'




export interface UserExtended extends User {
    code_id: null | number
    code_timeout: null | number
    approval: boolean
}

export type KeyboardList = {
    INDICATOR: ReplyKeyboardMarkup
    SOURCE: ReplyKeyboardMarkup
    DATA: ReplyKeyboardMarkup
    TIMEFRAME: ReplyKeyboardMarkup
    EXCHANGE: ReplyKeyboardMarkup
    STOCK: ReplyKeyboardMarkup
    [key: string]: ReplyKeyboardMarkup
}

export enum PROC_CONTEXT{
    DEFAULT,
    INDICATOR,
    CURRENTLS,
    LONGSHORT,
    TOTALLIQUIDATION,
    BINANCELIQUIDATION,
    BITMEXLIQUIDATION,
    TRENDINDICATOR,
    RAPIDMOVEMENT,
    VOLUMEFLOW,
    XTRADE,
    LIVETRADE,
    HOURLY24VF,
    OHLCV,
    DAILYVOL,
    HOURLYVOL,
    MERGEDVOL,
    TICKERLIST,
    OPENINTEREST,
}