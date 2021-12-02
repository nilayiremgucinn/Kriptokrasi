import { PROC_CONTEXT } from "./types";

export class Query {
    chat_id: Number;
    context: PROC_CONTEXT;
    data: string[]

    constructor(chat_id:Number, context:PROC_CONTEXT) {
        this.chat_id = chat_id;
        this.context = context;
        this.data = [];
    }

    addData(datatoAdd: string){
        this.data.push(datatoAdd);
    }
}