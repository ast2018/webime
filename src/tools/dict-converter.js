const fs = require('fs');
const dict = require('../resource/dict.json');

let result = [];
Object.keys(dict).forEach(key => {
  result.push([key, dict[key]]);
});

let finlResult = `IME.word = new Map(` + JSON.stringify(result) + `);`;
fs.writeFileSync('src/lib/word-new.js', finlResult);