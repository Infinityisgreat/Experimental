const Discord = require("discord.js");
const { MessageEmbed, MembershipScreeningFieldType } = require("discord.js");
const { Color } = require("../../config.js");
const { Warns } = require("../../warnings.json");
const { PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "warn",
  aliases: [],
  description: "Warn A User!",
  usage: "Warn <Mention User> | <Reason>",
  
  run: async (client, message, args) => {
    //Start

    const Member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);


    





    message.delete();

        if (!message.member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]))
      return message.channel.send(
        `You Don't Have Permission To Use This Command!`
      );

    if (!Member) return message.channel.send(`Please Mention A User!`);

 await client.db.add(`Warnings_${message.guild.id}_${Member.user.id}`, 1);

    let Warnings = await client.db.get(
      `Warnings_${message.guild.id}_${Member.user.id}`
    );

    let Reason = args.slice(1).join(" ");

      const { EmbedBuilder } = require("discord.js")

      // inside a command, event listener, etc.
      const embed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle('Warning')
          .setAuthor({ name: 'Expiremental 2022' })
          .setDescription(`${Member.user.tag} has been warned!`)
          .addFields(
              { name: 'Moderator', value: `${message.author.tag} ${message.author.id} `, Inline: true },
              { name: 'Warned Member', value: `${Member.user.tag}`, inline: true },
              { name: `Member Warnings:`, value:`${Warnings}}`, inline: true},
              { name: 'Reason', value: `${Reason || "No Reason Provided!"}`, inline: true }
          )
          .setTimestamp()
          .setImage("https://c.tenor.com/sLgNruA4tsgAAAAC/warning-lights.gif")
          .setFooter({ text: 'Expiremental', iconURL: "https://icon-library.com/images/dev-icon/dev-icon-8.jpg" });
      
          message.channel.send({ embeds: [embed] });
          Member.send({ embeds: [embed]})

    //End
  }
};