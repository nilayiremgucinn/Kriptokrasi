



class RequestsList{
    requests: any

    constructor() {
        this.requests = {};
    }

    updateItem(user_id: number, key: string, value: string) {
        this.requests[user_id][key] = value;
    }

    deleteItem(user_id: number) {
        delete this.requests[user_id];
    }
}