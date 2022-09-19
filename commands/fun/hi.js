const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "howgay",
  aliases: [],
  description: "Show How Gay Member Is!",
  usage: "Howgay <Mention Member>",
  run: async (client, message, args) => {
    //Start 
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = Math.floor(Math.random() * 101);
// at the top of your file
const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Gay Detector')
	.setAuthor({ name: 'Expiremental 2022' })
	.setDescription(`${message.mentions.members.first()} is ${Result}% gay!`)
	.addFields({ name: `It's okay to be gay!`, value: `Expiremental Doesn't mind :) :rainbow:`, inline: true })
	.setTimestamp()
	.setFooter({ text: 'Expiremental', iconURL: "https://icon-library.com/images/dev-icon/dev-icon-8.jpg" });

message.channel.send({ embeds: [exampleEmbed] });

    //End
  }
};