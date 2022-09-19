const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

const { PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "ban",
  aliases: [],
  description: "Ban A Member!",
  usage: "Ban <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers]))
    message.channel.send(
        `You Don't Have Permission To Use This Command!`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `Please Mention A Member That You Want To Ban!`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`Please Mention A Valid Member!`);

    if (Member.id === message.author.id)
      return message.channel.send(`You Can't Ban Your Self!`);

    if (Member.id === client.user.id)
      return message.channel.send(`Please Don't Ban Me ;-;`);

    if (Member.id === message.guild.ownerId)
      return message.channel.send(`You Can't Ban Owner Of Server!`);

    let Reason = args.slice(1).join(" ");

    let User = await message.guild.members.fetch(Member)

    if (!User.bannable) return message.channel.send(`I Can't Ban That Member!`);

    try {
      console.log(`Member Is Going To Get Ban!`);
      setTimeout(function() {
        User.ban({ reason: `${Reason || "No Reason Provided!"}` });
      }, 2000);
  
const { EmbedBuilder } = require("discord.js")

// inside a command, event listener, etc.
const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Member Banned')
	.setAuthor({ name: 'Expiremental 2022' })
	.setDescription(`${Member.username} has been banned!`)
    .addFields(
		{ name: 'Moderator', value: `${message.author.tag} ${message.author.id} `, Inline: true },
		{ name: 'Banned Member', value: `${Member.tag} (${Member.id}`, inline: true },
		{ name: 'Reason', value: `${Reason || "No Reason Provided!"}`, inline: true }
	)
	.setTimestamp()
    .setImage("https://c.tenor.com/20Bv1f8Vx30AAAAC/thor-banned-ban-hammer.gif")
	.setFooter({ text: 'Expiremental', iconURL: "https://icon-library.com/images/dev-icon/dev-icon-8.jpg" });
   

      if (User && Member.bot === false)
        Member.send({ embeds: [embed ]});
        message.channel.send({ embeds: [embed] });
      console.log(
        `User: ${Member.tag} (${Member.id}) Just Got Banned From ${
          message.guild.name
        } For ${Reason || "No Reason Provided!"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `If the member hasn't been banned it mean's that there's something wrong!`
        )
        .then(() => console.log(error));
    }

    //End
  }
};