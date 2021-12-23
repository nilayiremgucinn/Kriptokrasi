import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from 'input';
import { NewMessage, NewMessageEvent } from "telegram/events";

const apiId = 14065256;
const apiHash = "890f51d5b5858bee384cc1a720899451";
const stringSession = new StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEAUHaP1fc0Dh2Eim2nwGC/39rXoUCx8ZNkax38h2WUilM4zywBhvIFfrMuT6D4MiKPaUxcDfnTi3z+uHTQmbH8oEIRkoyGydjbrSkNVvt5CD2c13l0GJITCVuM8mEQWxnIqO+TKcDPCXZXb2fwO9wP5PDc4fryGBd2s2BJ+h0gzYmhFdjHjymedtJbBUS/ZWTsf3TfuXANUL2pAWyxlWgqgmOHEsT164+m0u6+6RNry5CgPTyq4GNfm+wxXOC9QPqVFazhZdHJ8IWigikeC2eRZaoftdviaZQ9mf8gxpN3HmeICKQoD7DBRyiw0X8BV1VmwZwVB2Wsvb6haznuJyRXTZ0="); // fill this later with the value from session.save()

(async () => {
    console.log("Loading interactive example...");

    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });

    await client.start({
        phoneNumber: async () => await input.text("number ?"),
        password: async () => await input.text("password?"),
        phoneCode: async () => await input.text("Code ?"),
        onError: (err) => console.log(err),
    });

    console.log("You should now be connected.");

    client.session.save(); // Save this string to avoid logging in again

    let dialogs = await client.getDialogs({})

    let crypto_dialog = dialogs.find(dialog => dialog.title === 'CryptoMeter.io Bot');

    let messages = await client.getMessages(crypto_dialog.entity, { limit: 10 });

    console.log('OLD MESSAGES:');
    messages.forEach(message => { !message.out && console.log(message.text,'\n') });

    client.addEventHandler(NewMessageHandler, new NewMessage({ chats: [crypto_dialog.entity.id] }))

})();

function NewMessageHandler(event: NewMessageEvent) {
    if (!event.message.out) {
        console.log('-------- NEW MESSAGE --------');
        console.log(event.message.message,'\n');
    }
}
