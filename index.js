const Discord = require("discord.js");
const fs = require("fs");
const { Prefix, Color } = require("./config.js");
const { Client, GatewayIntentBits } = require('discord.js');

const { connect } = require("mongoose")

require("dotenv").config()

const { databaseToken } = process.env

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const { QuickDB } = require('quick.db');
const db = new QuickDB();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();



const { ActivityType } = require("discord.js");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity("Expiremental | e.help", {
    type: ActivityType.Watching,
  });
  client.user.setStatus("dnd");
});

client.on("guildMemberAdd", (message, user) => {
    channel.send("Hey ", user.username, " we're excited to have you in our server!")
})

client.on("messageCreate",  (message) => {
    
    
  if (message.channel.type === "DM") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member =  message.guild.fetchMember(message);

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    return message.channel.send(`Bot Prefix : e.`);
  }
});

let modules = ["fun", "info", "moderation"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(err, files) {
    if (err)
      return new Error(
        "Missing Folder Of Commands! Example : Commands/<Folder>/<Command>.js"
      );
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} Command Has Been Loaded - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      if (command.aliases.length === 0) command.aliases = null;
    });
  });
});

client.on("messageCreate", (message) => {
    
  if (message.channel.type === "DM") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member =  message.guild.fetchMember(message);

  if (!message.content.startsWith("e.")) return;

  const args = message.content
    .slice("e.".length)
    .trim()
    .split(" ");
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;
  if (command) {

        command.run(client, message, args);
  }
  console.log(
    `User : ${message.author.tag} (${message.author.id}) Server : ${message.guild.name} (${message.guild.id}) Command : ${command.name}`
  );
});


client.login(process.env.token);
(async () => {
    await connect(databaseToken).then(() => console.log("The client is now connected to the db"));
})();
