let fs = require("fs");
module.exports = {
    token: fs.readFileSync("./TOKEN").toString(),
    msgSendMs: 15000,
    msgAutoDeleteMs: 60000,
    staffCheckMs: 10000,
    guild: "710769681606246480",
    channel: "710769852104835073",
    role: "710797527997480991", //353949968136142848
    fetchWordsFromChannel: true,
    wordsChannel: "710807488580026379",
    words: ["test1","test2","test3","test4","test5","test6"]
};