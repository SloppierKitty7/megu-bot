module.exports = {
	desc: "Get information about a user",
	usage: "<@user>",
	hidden: false,
	guildOnly: true,
	ownerOnly: false,
	task(bot, msg, suffix) {
			var e__ = msg.guild.emojis.map(c => c.name + ":" + c.id).join('> <:')

			let embed = {
			color: 12391760,
            author: {
                name: msg.guild.name,
                icon_url: msg.guild.iconURL
            },
            thumbnail: {
                url: msg.guild.iconURL
            },
            fields: [{
					name: `emojis`,
                    value: `${'<:' + e__ + '>'}`
				}
            ]
        }
		console.log(e__) 
        	//console.log (JSON.stringify(msg.guild.emojis));
			bot.createMessage(msg.channel.id,{embed: embed});			
	}
};