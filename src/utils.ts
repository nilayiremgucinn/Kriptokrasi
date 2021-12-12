export function arrangeKeyboard(data: string[], split = 3) {

    let keyboard: string[][] = [];
    let row: string[] = [];

    for (let i = 0; i < data.length; i++) {
        if (i % split === 0 && row.length) {
                keyboard.push(row);
                row = [];
        }
        row.push(data[i]);
    }

    if (row.length) {
        keyboard.push(row);
    }

    return keyboard;
}
