const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 32767 });
const fs = require('fs')
const prefix = 'm.'
require("dotenv").config()

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.afk = new Map();



fs.readdir('./commands', (err, file) => {
    if(err) console.log(err);

    let jsfiles = file.filter(f => f.split(".").pop() === "js");




    
    if(jsfiles.length <= 0) {
        return console.log('No Command Is Found!');
    }

    jsfiles.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded`);
        bot.commands.set(props.help.name, props);


        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name)
        })
    })
})


const { ActivityType } = require("discord.js")
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);

bot.user.setActivity('Expiremental | e.help', { type: ActivityType.Watching });
bot.user.setStatus('dnd');
});

bot.on('messageCreate', (message) => {

    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let command;
    if(bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    }  else if(bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
    }

    try {
        command.run(bot, message, args);
    } catch(e) {
        return;
    }
});
bot.login(process.env.token);