(async () => {
let Discord = require("discord.js");
let bot = new Discord.Client();

let config = require("config.js");
let messagesSent = [];

await bot.login(config.token);

guild = await bot.guilds.get(config.guild);
channel = await bot.channels.get(config.channel);

bot.on("guildMemberAdd", sendPropaganda);

function sendPropaganda() {
    if(checkStaffClear()) {
        channel.send(config.words[Math.floor(Math.random() * config.words.length)]).then(msg => {messagesSent.push(msg); msg.delete(config.msgAutoDeleteMs)});
    }
}

function checkStaffClear() {
    return guild.members.find(m => {m.roles.has(config.staffRole) && m.presence.status === "online"}) == null;
}

function checks() {
    if (!checkStaffClear()) {
        messagesSent.forEach(msg => msg.delete());
    }
    bot.user.setUsername(guild.members.get(172002275412279296).displayName);
}

setInterval(sendPropaganda, config.msgSendMs);
setInterval(checks, config.msgAutoDeleteMs);
})();