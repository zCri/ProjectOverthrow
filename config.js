module.exports = {
    token: fs.readFileSync("./TOKEN").toString(),
    msgSendMs: 600000,
    msgAutoDeleteMs: 600000,
    staffCheckMs: 60000,
    guild: "1",
    channel: "",
    staffRole: "", //353949968136142848
    words: []
};