module.exports = {
	desc: "Get information about the channel",
	usage: "",
	hidden: false,
	guildOnly: true,
	ownerOnly: false,
	task(bot, msg, suffix) {
			if (msg.channel.topic == "" ){
				var t_ = 'n/a'
			}else{
				var t_ = msg.channel.topic
			}

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
					name: `ID`,
                    value: `${msg.channel.id}`,
					inline: true
				},{
					name: `Name`,
                    value: `${msg.channel.name}`,
					inline: true
				},{
					name: `Position`,
                    value: `${msg.channel.position}`,
					inline: true
				},{
					name: `Topic`,
                    value: `${t_}`
				}
            ]
        }
			bot.createMessage(msg.channel.id,{embed: embed});			
	}
};