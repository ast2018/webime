/** 生成字库 */
const fs = require('fs');
const path = require('path')

fs.readFile(path.resolve(__dirname, '../resource/GBK.txt'), (err, data) => {
    if (err)
        throw err;

    convert(data);
});

function convert(data) {
    let wordsDict = data.toString();
    let wordsLines = wordsDict.split('\r\n');

    let result = new Map();

    for (let i = 0; i < wordsLines.length; i++) {
        let wordsLine = wordsLines[i];

        let words = wordsLine.split('=');

        let pinyin = words[0];
        let char = words[1];

        if (!result.has(pinyin)) {
            result.set(pinyin, char)
        } else {
            let value = result.get(pinyin);
            value += char;
            result.set(pinyin, value)
        }
    }
    let finalResult = strMapToJson(result);
    fs.writeFileSync('src/resource/dict.json', finalResult);
}

function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
