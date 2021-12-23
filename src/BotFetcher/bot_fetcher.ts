import { waitForDebugger } from "inspector";
import puppeteer from "puppeteer";
import readline from "readline";

(async () => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://web.telegram.org');


    await waitInput();


    let elem_list = await page.$$eval('div[class="content-inner"]', elems => elems.map(elem => elem.textContent));
    elem_list.forEach(elem => console.log(elem));

    await browser.close();

})();

function waitInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question('Press ENTER to continue...', ans => {
        rl.close();
        resolve(ans);
    }))
}