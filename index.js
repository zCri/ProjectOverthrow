let Discord = require("discord.js");
let bot = new Discord.Client();

let config = require("./config.js");

let chalk = require("chalk");

bot.login(config.token).then(main);

async function main() {
    await bot.user.setPresence({status: "invisible"});
    console.log(chalk.black.bgCyan("Bot Started."));

    let guild = await bot.guilds.resolve(config.guild);
    let channel = await bot.channels.fetch(config.channel);

    if(config.fetchWordsFromChannel) {
        console.log(chalk.black.bgCyan("Fetching propaganda from Project Overthrow server."));
        let messages = await(await bot.channels.fetch(config.wordsChannel)).messages.fetch();
        config.words = [];
        messages.forEach(msg => config.words.push(msg.content));
        console.log(chalk.black.bgCyan(`Fetched ${config.words.length} propagandas from Project Overthrow server.`));
    }

    await checks();

    async function sendPropaganda() {
        if(await checkStaffClear()) {
            console.log(chalk.black.bgGreen("Staff not online, sending propaganda."));
            await channel.send(config.words[Math.floor(Math.random() * config.words.length)]).then(msg => msg.delete({timeout: config.msgAutoDeleteMs}).catch(() => {}));
        } else {
            console.log(chalk.black.bgRed("Staff online, not sending propaganda."));
        }
    }

    async function checkStaffClear() {
        console.log(chalk.black.bgYellow("Checking if staff is online."));
        return (await guild.members.fetch()).find(m => {return m.roles.cache.has(config.role) && m.user.presence.status !== "offline"}) == null;
    }

    async function checks() {
        console.log(chalk.black.bgYellow("Performing regular checks"));
        if (!await checkStaffClear()) {
            console.log(chalk.black.bgRed("Staff online, deleting all messages."));
            (await channel.messages.fetch()).filter(msg => msg.author.id === bot.user.id).forEach(msg => msg.delete().catch(() => {}));
        }
        (await guild.members.fetch(bot.user.id)).setNickname((await guild.members.fetch("172002275412279296")).displayName);
    }

    setInterval(sendPropaganda, config.msgSendMs);
    setInterval(checks, config.staffCheckMs);
}