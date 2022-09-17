const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!args[0]) return message.reply("Please ask a full question");
    let replies = [
        'Maybe.',
	    'Certainly not.',
	    'I hope so.',
	    'Not in your wildest dreams.',
    	'There is a good chance.',
	    'Quite likely.',
    	'I think so.',
    	'I hope not.',
    	'I hope so.',
    	'Never!',
    	'Pfft.',
	    'Sorry, bucko.',
    	'Hell, yes.',
    	'Hell to the no.',
    	'The future is bleak.',
	    'The future is uncertain.',
	    'I would rather not say.',
    	'Who cares?',
    	'Possibly.',
    	'Never, ever, ever.',
    	'There is a small chance.',
    	'Yes!',
    	'lol no.',
    	'There is a high probability.',
    	'What difference does it makes?',
    	'Not my problem.',
        'Ask someone else.'
    ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let embed = new Discord.MessageEmbed()
    .setTitle("MAGIC 8 BALL!!!")
    .setColor("#AA9900")
    .addField("Q:", question)
    .addField("A:", replies[result])
    .setFooter(`© Matty by Infinity#2670`);

    message.channel.send({embed});
}
  
module.exports.help = {
    name: '8ball',
    aliases: []
  };
  